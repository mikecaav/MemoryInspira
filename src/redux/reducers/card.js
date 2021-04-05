import {type as flipCard} from "../actions/flipCard"
import {type as initCardType} from "../actions/initCard"
import {type as findPairs} from "../actions/findPairs"

const pairDefaultList = []
const cardDefaultObjects = {}
const defaultState = [cardDefaultObjects, pairDefaultList]
const defaultHiddenCardFilename = "back"
export const PAIR_LIST = 1
export const CARD_LIST = 0

const cardReducer = (state=defaultState, action) => {
    switch (action.type){
        case initCardType:
            const pairId = Math.ceil(parseInt(action.payload.filename)/2)
            action.payload = {
                ...action.payload,
                showFilename: defaultHiddenCardFilename,
                pairId,
                pairFound: false,
            }
            state[CARD_LIST][action.payload.uuid] = action.payload
            return state

        case flipCard:
            const uuid = action.payload
            if (!state[CARD_LIST][uuid].pairFound){
                state[CARD_LIST][uuid].isHidden = !state[CARD_LIST][uuid].isHidden
                if (state[CARD_LIST][uuid].isHidden){
                    state[CARD_LIST][uuid].showFilename = defaultHiddenCardFilename
                }else {
                    state[CARD_LIST][uuid].showFilename = state[CARD_LIST][uuid].filename
                }
            }
            return {...state}

        case findPairs:
            return state

        default:
            return state
    }
}

export default cardReducer