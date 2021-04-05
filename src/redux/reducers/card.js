import {type as flipCard} from "../actions/flipCard"
import {type as initCardType} from "../actions/initCard"
import {type as findPairs} from "../actions/findPairs"

const pairDefaultElement = {}
const cardDefaultObjects = {}
const defaultState = {"cardObjects": cardDefaultObjects, "pairElement": pairDefaultElement}
const defaultHiddenCardFilename = "back"
export const pairElement = "pairElement"
export const cardObjects = "cardObjects"

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
            state[cardObjects][action.payload.uuid] = action.payload
            return state

        case flipCard:
             uuid = action.payload
            actualCard = state[cardObjects][uuid]
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
            uuid = action.payload
            actualCard = state[cardObjects][uuid]
            const prevSelectedCard = state[pairElement]
            uuid = action.payload
            if (Object.entries(prevSelectedCard).length === 0){
                state[pairElement] = {...actualCard}
            }else {
                if (prevSelectedCard.pairId === actualCard.pairId){
                    state[cardObjects][prevSelectedCard.uuid].pairFound = true
                    state[cardObjects][actualCard.uuid].pairFound = true
                }else{
                    prevSelectedCard.isHidden = true
                    actualCard.isHidden = true
                    state[cardObjects] = {
                        ...state[cardObjects],
                        actualCard,
                        prevSelectedCard
                    }
                }
                state[pairElement] = {}
            }

            return {
                ...state
            }


        default:
            return state
    }
}

export default cardReducer