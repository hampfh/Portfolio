import { LineType, IConsoleState } from "state/reducers/console"
import { IChatState } from "state/reducers/chat"
import { ReturnType } from "functions/Interpreter"
import { socketEmit } from "components/utilities/SocketManager"

export function EnterChat(args: string[], consoleState: IConsoleState, chatState: IChatState): ReturnType {
	chatState.active = true
	consoleState.lines = [{ id: Math.random() * 1000, type: LineType.info, text: "Entered chat mode" }]

	socketEmit("enterchat", {
		user: chatState.chatName ?? "Anonymous",	
	})

	return { status: 0, state: consoleState, chatState };
}

export function LeaveChat(args: string[], consoleState: IConsoleState, chatState: IChatState): ReturnType {
	chatState.active = false
	return { status: 0, state: consoleState, chatState }
}

export function SetChatName(args: string[], consoleState: IConsoleState, chatState: IChatState): ReturnType {
	// Delete all empty arguments
	for (let i = 0; i < args.length; i++) {
		if (args[i].length <= 0)
			args.splice(i,1)
	}
	// Don't allow empty
	if (args.length <= 0)
		return { status: 1, message: "Name cannot be empty" }

	chatState.chatName = args.join(" ")
	return { status: 0, state: consoleState, chatState, message: "Successfully set chat name!"}
}