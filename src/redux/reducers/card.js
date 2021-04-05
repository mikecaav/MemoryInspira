import {type as flipCard} from "../actions/flipCard"
import {type as initCardType} from "../actions/initCard"
import {type as findPairs} from "../actions/findPairs"

const pairDefaultElement = {}
const cardDefaultObjects = {}
const defaultState = [cardDefaultObjects, pairDefaultElement]
const defaultHiddenCardFilename = "back"
export const PAIR_ELEMENT = 1
export const CARD_LIST = 0

const cardReducer = (state=defaultState, action) => {
    let uuid = 0
    let actualCard = null
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
             uuid = action.payload
            actualCard = state[CARD_LIST][uuid]
            if (!actualCard.pairFound){
                actualCard.isHidden = !actualCard.isHidden
                if (actualCard.isHidden){
                    actualCard.showFilename = defaultHiddenCardFilename
                }else {
                    actualCard.showFilename = actualCard.filename
                }
            }
            return {...state}

        case findPairs:
            actualCard = state[CARD_LIST][uuid]
            const prevSelectedCard = state[PAIR_ELEMENT]
            uuid = action.payload
            if (Object.entries(prevSelectedCard).length === 0){
                state[PAIR_ELEMENT] = actualCard
            }else {
                if (prevSelectedCard.pairId === actualCard.uuid){
                    state[CARD_LIST][prevSelectedCard.uuid].pairFound = true
                    state[CARD_LIST][actualCard.uuid].pairFound = true
                }else{
                    state[PAIR_ELEMENT] = {}
                }
            }
            return {...state}


        default:
            return state
    }
}

export default cardReducer