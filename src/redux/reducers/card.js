import {type as flipCard} from "../actions/flipCard"
import {type as initCardType} from "../actions/initCard"
import {type as findPairs} from "../actions/findPairs"

const pairDefaultElement = {}
const cardDefaultObjects = {}
const defaultState = {"cardObjects": cardDefaultObjects, "pairElement": pairDefaultElement}
const defaultHiddenCardFilename = "back"
export const pairElement = "pairElement"
export const cardObjects = "cardObjects"
const emptyElement = {}

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
            state = flipActualCard(state, actualCard)
            return {...state}

        case findPairs:
            uuid = action.payload
            actualCard = state[cardObjects][uuid]
            const prevSelectedCard = state[pairElement]
            state = matchPairs(state, prevSelectedCard, actualCard)
            return {
                ...state
            }


        default:
            return state
    }
}

const matchPairs = (state, prevSelectedCard, actualCard) => {
    const prevCardIsEmpty = Object.entries(prevSelectedCard).length === 0
    if (prevCardIsEmpty){
        if (!actualCard.isHidden){
            state[pairElement] = {...actualCard}
        }
    }
    else {
        if (prevSelectedCard.pairId === actualCard.pairId){
            if (actualCard.uuid !== prevSelectedCard.uuid){
                state[cardObjects][prevSelectedCard.uuid].pairFound = true
                state[cardObjects][actualCard.uuid].pairFound = true
            }
        }else{
            flipBothCards(state, actualCard, prevSelectedCard)
        }
        state[pairElement] = emptyElement
    }
    return {...state}
}

const flipActualCard = (state, actualCard) =>{
    if (!actualCard.pairFound){
        actualCard.isHidden = !actualCard.isHidden
        if (actualCard.isHidden){
            actualCard.showFilename = defaultHiddenCardFilename
        }else {
            actualCard.showFilename = actualCard.filename
        }
    }
    state[cardObjects][actualCard.uuid] = actualCard
    return {
        ...state
    }
}

const flipBothCards = (state, actualCard, prevCard) => {
    state = flipActualCard(state, actualCard)
    state = flipActualCard(state, prevCard)
    return {...state}
}


export default cardReducer