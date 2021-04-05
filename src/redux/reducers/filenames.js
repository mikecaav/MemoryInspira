import {type as getFilenamesType} from "../actions/getFilenames"

const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

let default_state = shuffle([
    "1-100","2-100","3-100","4-100","5-100","6-100","7-100","8-100","9-100","10-100","11-100","12-100",
    "13-100","14-100","15-100","16-100","17-100","18-100","19-100","20-100","21-100","22-100","23-100","24-100",
    "25-100","26-100","27-100","28-100","29-100","30-100","31-100","32-100",
])

export const filenameReducer = (state= default_state, action) =>{
    switch (action.type){
        case getFilenamesType:
            return state
        default:
            return state
    }
}