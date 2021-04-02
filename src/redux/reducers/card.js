import {type as toggleStateType} from "../actions/toggleState"


const defaultState = []

const cardReducer = (state=defaultState, {type, payload}) => {
    switch (type){
        case toggleStateType:
            return {
                ...state,
                payload
            }
        default:
            return state
    }
}

export default cardReducer