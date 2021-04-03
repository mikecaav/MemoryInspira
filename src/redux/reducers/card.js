import {type as toggleStateType} from "../actions/toggleState"
import {type as initCardType} from "../actions/initCard"

const defaultState = []

const cardReducer = (state=defaultState, action) => {
    switch (action.type){
        case initCardType:
            state.push(action.payload)
            return state

        case toggleStateType:
            state.map((card) => {
                if (card.uuid === action.payload){
                    card.isHidden = !card.isHidden
                }
            })
            return state
        default:
            return state
    }
}

export default cardReducer