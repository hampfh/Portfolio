import { ActionType } from './'

export interface IChatMessage {
	user: string,
	message: string,
	timestamp: Date
}

export interface IChatState {
	active: boolean,
	chatName?: string,
	history: IChatMessage[]
}

const defaultState = {
	active: false,
	history: []
}

const console = (state: IChatState = defaultState, action: ActionType) => {
	let newState = { ...state };
	switch (action.type) {
		case 'SET_CHAT_STATE':
			newState = action.payload.state
			return newState
		case 'SET_ACTIVE':
			newState.active = action.payload.active
			return newState
		case 'SET_NAME':
			newState.chatName = action.payload.name
			return newState
		case 'ADD_MESSAGE':
			if (!newState.history)
				newState.history = [action.payload.packet]
			else
				newState.history.push(action.payload.packet)
			return newState
		default:
			return newState
	}
}

export default console;