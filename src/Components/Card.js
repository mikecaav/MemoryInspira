import {Image} from "react-bootstrap"
import {initCard} from "../redux/actions/initCard"
import {useDispatch, useSelector} from "react-redux"
import {flipCard} from "../redux/actions/flipCard"
import {CARD_LIST, PAIR_ELEMENT} from "../redux/reducers/card"

export const Card = ({filename, uuid}) => {
    const dispatch = useDispatch()
    const cardReducer = useSelector(state => state.cardReducer)
    if (!cardReducer[CARD_LIST].hasOwnProperty(uuid)){
        dispatch(initCard({uuid, filename, isHidden:true}))
    }

    return (
        <Image src={`./images/${cardReducer[CARD_LIST][uuid].showFilename}.jpg`}
               rounded
               style={{
                   height: "50", width: "100%",
               }}
               onClick= { () => dispatch(flipCard(uuid)) }
        />
    )
}