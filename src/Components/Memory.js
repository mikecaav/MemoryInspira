import {Col, Row} from "react-bootstrap"
import {Card} from "./Card"
import {useSelector} from "react-redux"

export const Memory = () => {
    const filenames = useSelector(state => state.filenameReducer)
    return(
        <Row>
            {
                filenames.map((filename)=>{
                    filename = filename.split(".jpg")[0].split("/")[1]
                    return(
                        <Col xs={2} md={2} filename={filename}>
                            <Card/>
                        </Col>
                    )
                })
            }
        </Row>
    )
}