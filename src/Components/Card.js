import {Image} from "react-bootstrap"
import {useSelector, useDispatch} from "react-redux"

export const Card = () => {
    const cardReducer = useSelector(state => state.cardReducer)
    const dispatch = useDispatch()
    return <Image src={"images/01.jpg"} rounded
                  style={{height: "100", width: "100%"}}
    />
}