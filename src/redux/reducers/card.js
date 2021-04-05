import {type as toggleStateType} from "../actions/toggleState"
import {type as initCardType} from "../actions/initCard"

const defaultState = {}
const defaultHiddenCardFilename = "back"

const cardReducer = (state=defaultState, action) => {
    switch (action.type){
        case initCardType:
            action.payload = {
                ...action.payload,
                showFilename: defaultHiddenCardFilename
            }
            state[action.payload.uuid] = action.payload
            return state

        case toggleStateType:
            const uuid = action.payload
            state[uuid].isHidden = !state[uuid].isHidden
            if (state[uuid].isHidden){
                state[uuid].showFilename = defaultHiddenCardFilename
            }else {
                state[uuid].showFilename = state[uuid].filename
            }
            return {...state}

        default:
            return state
    }
}

export default cardReducer