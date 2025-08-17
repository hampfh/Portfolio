---
layout: ../../layouts/BlogLayout.astro
title: Lexical's bot protection and how I got around it
description: How to handle form-filling edge cases in a browser extension
tags: ["extension", "lexical"]
time: 10
featured: true
timestamp: 2025-05-21T02:39:03+00:00
filename: lexical-ingeniuos-bot-protect-and-how-i-got-around-it
---

# Introduction - The why

For almost all systems today, we transfer data between entities. It's the internet, after all. The most common way of doing this is through APIs, and sometimes, when you feel extra adventurous, you establish a WebSocket, RPC-like connection, or anything in between. However, all of these make one fundamental assumption: that the party being talked to wants to be talked to, which means that for any given protocol, there is a schema agreed upon by both parties, ensuring that we know what to send and what to expect. But what happens when this party doesn't want to be talked to or doesn't expose any of that functionality due to it being a user interface?

This is precisely the problem I was introduced to at Tandem Health, the medical AI scribe company that writes clinician interactions for you. At its core, the product transcribes conversations and structures them in a specific format, which is then transferred to the clinic's actual EHR (Electronic Health Record) system. Here, we're introduced to the problem: Tandem must be able to output many integrations to these EHRs, and relying on them to provide, open, or, worst case, build is not feasible, both from an economic and time perspective. We are therefore left with two options:

1. Reverse engineer the internal API that the EHR uses

   - ✅ Seamless: If successful, can work as if we were the EHR
   - ❌ complexity, takes time and requires a lot of testing and exploring
   - ❌ Fragile, if the API changes, everything breaks

2. Simulate user interaction and require the user to be logged in to the EHR

   - ✅ Very fast to implement
   - ✅ Resilient to technical changes
   - ❌ Requires the user to have the EHR open in a separate tab or application

They both present some very interesting challenges and have their unique pros and cons. In the case of Tandem, they chose alternative (2) because it allows for a much larger throughput in terms of integrations. Building on the fact that clinicians already have their EHRs open, the inconvenience of having to open a new tab or application is not a deal breaker. It also significantly simplifies implementation, as all complexity associated with understanding the patient's context and handling EHR authentication is dealt with by the EHR itself.

Now that you have some background into how we ended up here let's dive into the technical details! As mentioned earlier, creating integrations through emulating user interaction is typically a speedy approach. First, as a developer you watch the clinician go through the flow, observing what fields are used, what data is required, and what type it is. Then, using browser developer tools, we can start to manipulate the DOM and inject data into the form fields. This process is usually very straightforward and most of the integrations look more or less like this:

```typescript
const element = document.querySelector<HTMLInputElement>(
  ".some-form input.some-input"
);
element.value = "John Doe";
element.dispatchEvent(new Event("input", { bubbles: true }));
```

This is the happy path! What we're doing is finding the element in the DOM, setting the value and triggering an event to update the value. But the world wouldn't be as fascinating if it was always this simple, right?

## The "problem" with React

React as we all know is by default controlled. This means it doesn't care about what value is inside a specific field; it has its own vDOM representation and expectation of what is already there. Setting the `.value` of a field will seemingly work until a state update occurs, at which point the value will be lost and replaced with whatever the state is.

Sometimes depending on the implementation only dispatching the `input` event is not enough and you have to trigger a `change` event as well. One such occurrence is working against select components from the [react-select](https://react-select.com/) library. In this case it's not even enough to set the value and trigger an event. You have to activate a keydown event followed by a `change` event for every letter individually. While being a bit odd, this is still relatively straightforward.

## Lexical - The final boss

3. Use api specific apis, trigger react .set function in the DOM

4. Lexical specific. Find the lexical node, by reading the docs setLexicalState, lookup how it is formatted, insert the value. However while this does work when interacting with the browser shell, as it turns out, this is not the entire story. As soon as this code is executed from a browser extension nothing happens. The reason as it turns out for this is that extensions live in another context than the browser DOM, the methods that can be invoked by the javascript is not accessbile to the extension. This is very problematic as it means that suddenly we can no longer interact with the our lexical instance editor.

5. Web accessibility resource -> make a javascript file -> inject into the page -> install an event listener, then from the extension send messages to the content script with the payload and the selector of the element to update.

6. Works but what about privilege escalation? That is a concern, we are injecting a script into the page. If we know that we only want to apply this to a specific domain, specify that. We want to make everything in our power to not trigger a privilege escalation step by chrome, if this happens worst case is that the extension is disabled by everyone already using it. Leading to a lot of angry users wondering why suddenly nothing is working anymore.

7. How to verify no privilege escalation? Bundle the script before and after, install it and then update. Hope for no trigger. Also make a sanity check and do ask for more privileges that should trigger a prompt to the user, if you do get a warning here, then you know that you are good to go.
