import {Component} from "react"
import {Col, Row} from "react-bootstrap"
import {Card} from "./Card"

export class Memory extends Component {
    render() {
        // let filenames = [
        //     "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "31",
        // ]
        return(
            <Row>
                <Col xs={2} md={2}>
                    <Card/>
                </Col>
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
}