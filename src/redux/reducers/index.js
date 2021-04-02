import {combineReducers} from "redux"
import cardReducer from "./card"
import {filenameReducer} from "./filenames"

const reducer = combineReducers({
    cardReducer,
    filenameReducer
})

export default reducer