import {type as initCard} from "../actions/Card/initCard"
import {type as flipUpCard} from "../actions/Card/flipUpCard"
import {type as flipDownCard} from "../actions/Card/flipDownCard"
import {type as matchPairs} from "../actions/Card/matchPairs";

const openedCardDefault = []
const cardObjectsDefault = {}
const defaultState = {"cards": cardObjectsDefault, "openedCards": openedCardDefault, "lockedBoard": false}
export const openedCards = "openedCards"
export const cards = "cards"
const defaultHiddenCardFilename = "back"

const cardReducer = (state = defaultState, action) => {
    let uuid
    let actualCard
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
            uuid = action.payload.uuid
            actualCard = state[cards][uuid]
            if (actualCard.isHidden) {
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
            state[openedCards].map((actualCard, actualCardIndex) => {
                const cardIndexIsOdd = !openedCardsIsEmpty && actualCardIndex % 2 !== 0
                if (cardIndexIsOdd) {
                    const prevCard = state[openedCards][actualCardIndex - 1]
                    state.lockedBoard = true
                    if (actualCard.pairId === prevCard.pairId) {
                        actualCard.pairFound = true
                        prevCard.pairFound = true
                        state[openedCards] = []
                    }
                    state[cards] = {
                        ...state[cards],
                        actualCard,
                        prevCard
                    }
                }
            })
            return {...state}


        case flipDownCard:
            state[openedCards].map((actualCard) => {
                if (!actualCard.pairFound) {
                    actualCard.isHidden = true
                    actualCard.showFilename = defaultHiddenCardFilename
                    state[cards] = {
                        ...state[cards],
                        actualCard,
                    }
                }
            })
            state.lockedBoard = false
            state[openedCards] = []
            return {...state}

        default:
            return {...state}
    }
}

export default cardReducer