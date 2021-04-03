import {Image} from "react-bootstrap"
import {initCard} from "../redux/actions/initCard"
import {useDispatch} from "react-redux"

export const Card = ({filename}) => {
    const dispatch = useDispatch()
    dispatch(initCard({filename}))

    return <Image src={`images/${filename}.jpg`} rounded
                  style={{height: "100", width: "100%"}}
    />
}