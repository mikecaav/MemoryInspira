import {Image} from "react-bootstrap"
import {initCard} from "../redux/actions/initCard"
import {useDispatch, useSelector} from "react-redux"
import {toggleState} from "../redux/actions/toggleState"

export const Card = ({filename, uuid}) => {
    const dispatch = useDispatch()
    dispatch(initCard({uuid, filename, isHidden:true}))
    const cardReducer = useSelector(state => state.cardReducer)

    return (

        <Image src={`./images/${cardReducer[uuid].showFilename}.jpg`}
               rounded
               style={{
                   height: "50", width: "100%",
               }}
               onClick= { () => dispatch(toggleState(uuid)) }
        />
    )
}