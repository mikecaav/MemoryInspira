import {toggleState} from "../actions/toggleState"

const defaultState = []

const cardReducer = (state=defaultState, {type, payload}) => {
    switch (type){
        case "TOGGLE_STATE":
            return {
                ...state,
                payload
            }
        default:
            return state
    }
}

export default cardReducer