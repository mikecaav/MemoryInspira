import {Image} from "react-bootstrap"
import {initCard} from "../redux/actions/initCard"
import {useDispatch} from "react-redux"
import {toggleState} from "../redux/actions/toggleState"

export const Card = ({filename, uuid}) => {
    const dispatch = useDispatch()
    dispatch(initCard({uuid, filename, isHidden:true}))

    return <Image src={`images/${filename}.jpg`}
                  rounded
                  style={{
                      height: "100", width: "100%",
                  }}
                  onClick= {()=>dispatch(toggleState(uuid))}
    />
}