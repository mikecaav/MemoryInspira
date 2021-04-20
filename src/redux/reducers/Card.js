import {type as initCard} from "../actions/Card/initCard"
import {type as flipUpCard} from "../actions/Card/flipUpCard"
import {type as flipDownCard} from "../actions/Card/flipDownCard"
import {type as matchPairs} from "../actions/Card/matchPairs";

const openedCardDefault = []
const cardObjectsDefault = {}
const defaultState = {"cards": cardObjectsDefault, "openedCards": openedCardDefault}
export const openedCards = "openedCards"
export const cards = "cards"
const defaultHiddenCardFilename = "back"

const cardReducer = (state = defaultState, action) => {
    let uuid
    let actualCard
    const openedCardsLengthIsPair = state[openedCards].length % 2 === 0
    const openedCardsIsEmpty = state[openedCards].length === 0

    switch (action.type) {
        case initCard:
            uuid = action.payload.uuid
            const pairId = Math.ceil(parseInt(action.payload.filename) / 2)
            action.payload = {
                ...action.payload,
                showFilename: defaultHiddenCardFilename,
                pairId,
                pairFound: false,
            }
            state[cards][uuid] = action.payload
            return {...state}

        case flipUpCard:
            uuid = action.payload
            actualCard = state[cards][uuid]
            if ( actualCard.isHidden ){
                actualCard.isHidden = false
                actualCard.showFilename = actualCard.filename
                state[openedCards].push(actualCard)
                state[cards] = {
                    ...state[cards],
                    actualCard
                }
            }
            return {...state}

        case matchPairs:
            if (openedCardsLengthIsPair && !openedCardsIsEmpty){
                const {actualCard, prevCard} = getLastOpenedPairs(state)
                if (actualCard.pairId === prevCard.pairId){
                    actualCard.pairFound = true
                    prevCard.pairFound = true
                }
                state[cards] = {
                    ...state[cards],
                    actualCard,
                    prevCard
                }
            }
            return {...state}

        case flipDownCard:
            console.log("Downed")
            if (openedCardsLengthIsPair && !openedCardsIsEmpty){
                const {actualCard, prevCard} = getLastOpenedPairs(state)
                if (!actualCard.pairFound){
                    actualCard.isHidden = true
                    prevCard.isHidden = true
                    actualCard.showFilename = defaultHiddenCardFilename
                    prevCard.showFilename = defaultHiddenCardFilename
                    state[cards] = {
                        ...state[cards],
                        actualCard,
                        prevCard
                    }
                    state[openedCards].pop()
                    state[openedCards].pop()
                }

            }
            return {...state}

        default:
            return {...state}
    }
}

const getLastOpenedPairs = (state) =>{
    const lastElementIndex = state[openedCards].length - 1
    const penultimateElementIndex = lastElementIndex - 1
    const actualCard = state[openedCards][lastElementIndex]
    const prevCard = state[openedCards][penultimateElementIndex]
    return (
        {actualCard, prevCard}
    )
}

export default cardReducer