import {Col, Row} from "react-bootstrap"
import {Card} from "./Card"
import {useSelector} from "react-redux"
import { v4 as uuidv4 } from 'uuid';


export const Memory = () => {
    const filenames = useSelector(state => state.filenameReducer)
    return (
        <Row>
            {
                filenames.map((filename) => {
                    return (
                        <Col xs={2} md={2} key={uuidv4()}>
                            <Card filename={filename} uuid={uuidv4()}/>
                        </Col>
                    )
                })
            }
        </Row>
    )
}