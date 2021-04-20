import {combineReducers} from "redux"
import cardReducer from "./Card"
import {filenameReducer} from "./filenames"

const reducer = combineReducers({
    cardReducer,
    filenameReducer
})

export default reducer