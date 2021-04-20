import {Image} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {cards} from "../redux/reducers/Card"
import {initCard} from "../redux/actions/Card/initCard"
import {flipUpCard} from "../redux/actions/Card/flipUpCard"
import {matchPairs} from "../redux/actions/Card/matchPairs"
import {flipDownCard} from "../redux/actions/Card/flipDownCard"


export const Card = ({filename, uuid}) => {
    const dispatch = useDispatch()
    const cardReducer = useSelector(state => state.cardReducer)
    if (!cardReducer[cards].hasOwnProperty(uuid)){
        dispatch(initCard({uuid, filename, isHidden:true}))
    }

    return (
        <Image src={`./images/${cardReducer[cards][uuid].showFilename}.jpg`}
               rounded
               style={{
                   height: "50", width: "100%",
               }}
               onClick= { () => {
                   dispatch(flipUpCard(uuid))
                   dispatch(matchPairs())
                   setTimeout(()=>{
                           dispatch(flipDownCard())
                       }, 5000
                   )
               } }
        />
    )
}