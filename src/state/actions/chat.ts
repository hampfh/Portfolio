import { IChatMessage, IChatState } from "state/reducers/chat"

export interface ISetChatState { (state: IChatState): void }
export const setChatState = (state: IChatState) => {
	return {
		type: 'SET_CHAT_STATE',
		payload: {
			state
		}
	}
}

export interface ISetChatActive { (active: boolean): void }
export const setChatActive = (active: boolean) => {
	return {
		type: 'SET_ACTIVE',
		payload: {
			active
		}
	}
}

export interface ISetChatName { (name: string): void }
export const setChatName = (name: string) => {
	return {
		type: 'SET_NAME',
		payload: {
			name
		}
	}
}

export interface IAddChatMessage { (packet: IChatMessage): void }
export const addChatMessage = (packet: IChatMessage) => {
	return {
		type: 'ADD_MESSAGE',
		payload: {
			packet
		}
	}
}