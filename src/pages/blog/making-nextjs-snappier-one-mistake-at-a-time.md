---
layout: ../../layouts/BlogLayout.astro
title: Making Next.js Snappier One Mistake at a Time
description: How small mistakes in data fetching and navigation made our Next.js app feel slow, and what I learned fixing them.
tags: ["nextjs", "typescript"]
time: 10
featured: true
timestamp: 2025-03-31T01:00:03+01:00
filename: making-nextjs-snappier-one-mistake-at-a-time
---

Over the last couple of months I've been working on a next.js project together with some friends. For a while, it has been bothering me that some pages of the platform were slow to load. The app just felt sluggish navigating between certain views because some pages simply took too long to load. Nothing we worried too much about though, after all, moving fast and shipping fast are the main priorities early in a project. As long as the performance problem isn’t too noticeable, it can easily be pushed until later, and so we did.

But I have a tendency to get really annoyed by these kinds of small things I know could be improved. So on and off over the past few weeks, whenever I had time, I tried to debug and figure out what was causing the slowness. Spoiler alert: it wasn’t just one thing.

Today, March 31st, I gave it another go, and after quite a bit of digging and fixing, I can boil it down to two major problems.

# Bad usage (or lack) of Suspense

This one’s a big fish, and usually doesn’t have a single clean solution, especially in a larger codebase. What I noticed was that we’d optimized for the wrong thing. Looking through our codebase, we had tried to reduce the number of requests by moving fetches higher up in the tree. While the idea is solid (you don’t want to fetch the same data multiple times), this contradicts how Suspense is meant to work. With a top-level fetch strategy, all subcomponents are blocked while the fetch is happening. Nothing is shown to the user until the data arrives, making the app feel slow.

The fix? Flip the mental model. Move data fetching closer to the component that needs it so that each one can be suspended independently. But we still want to avoid unnecessary round trips to the database. That’s where React’s `cache` function comes in. Unlike Next.js’s `cache`, it doesn’t persist across requests, which means it memoizes requests without risking stale data. This alone was a huge shift in how we approached things.

Here’s a simplified version of the refactor I did:

### Previous approach

```tsx
// page.tsx
export default async function EventPage() {
  const [user, event] = await Promise.all([getUser(), getEvent()]);
  return (
    <main>
      <Sidebar user={user} />
      <EventTable event={event} />
    </main>
  );
}

// sidebar.tsx
export function Sidebar(user) {
  return <div>...</div>;
}

// eventTable.tsx
export function EventTable({ event }: { event: Event }) {
  return <div>...</div>;
}
```

We avoided duplicate data fetching, but at the cost of interactivity.

### New approach

```tsx
// utils.ts
export const getUser = React.cache(async () => {
  return await fetch("...");
});

export const getEvent = React.cache(async () => {
  return await fetch("...");
});

// page.tsx
export default async function EventPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <EventTable />
      </Suspense>
    </main>
  );
}

// sidebar.tsx
export async function Sidebar() {
  const user = await getUser();
  return <div>...</div>;
}

// eventTable.tsx
export async function EventTable() {
  const [user, event] = await Promise.all([getUser(), getEvent()]);
  return <div>...</div>;
}
```

Now, each component loads independently and doesn’t block the rest of the page. Technically, `getUser()` is called twice, but thanks to memoization, it’s not a problem.

# Not using the Next.js Link tag

This one seems obvious, but it’s easy to overlook. And going forward, I’m enabling the Next.js ESLint plugin, which for some reason we didn’t have.

Everyone knows you should use `<Link>` instead of `<a>`, but what does `<Link>` actually do? Turns out, a lot. First, Next (like Astro and other multi-page apps, or MPAs) has a disadvantage in perceived performance. Clicking a link means rendering a new page, fetching HTML, and waiting for everything to load. A single-page app (SPA), by contrast, just swaps out content client-side and fetches only the new data it needs.

But Next.js is clever, it starts as an MPA but turns into an SPA after the first load. This is where `<Link>` shines. When you click a `<Link>`, Next intercepts it, prevents a full reload, and just updates the view. Bonus: it prefetches. As soon as the link comes into view, Next preloads the target page in the background. So by the time you click, most of the work is already done.

Use an `<a>` tag instead, and you bypass all of that. You get a full page reload, revalidation, and a re-render of all layouts. That’s exactly what happened to us.

We were using the ShadCn sidebar component (amazing stuff btw), and way down in its tree is a `<SidebarMenuSubButton>` component that defaults to `<a>`:

```tsx
// ui/sidebar.tsx
const SidebarMenuSubButton = React.forwardRef<
  ...
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"; // <-- here's the issue

  return (
    <Comp
      ref={ref}
      ...
      {...props}
    />
  );
});
```

This little detail was the root cause. The fix? Wrap the button in a `<Link>` and use `asChild` to pass the link through:

```tsx
<SidebarMenuSubItem>
  <SidebarMenuSubButton asChild>
    <Link href={...}>
      <BuildingIcon />
      Exhibitors
    </Link>
  </SidebarMenuSubButton>
</SidebarMenuSubItem>
```

It’s an easy fix once you spot it, but hard to notice when you're deep into other optimizations. Just another reminder that you’ve always got to question your assumptions.

The endorphin rush from fixing this and seeing the performance leap? Yeah. Noticeable 😅
