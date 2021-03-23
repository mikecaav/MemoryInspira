import {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {Card} from "./Card";

export class Memory extends Component {
    render() {
        return(
            <Row>
                <Col xs={6} md={6}>
                    <Card/>
                </Col>
                <Col xs={6} md={6}>
                    <Card/>
                </Col>
                <Col xs={6} md={6}>
                    <Card/>
                </Col>
            </Row>
        );
    }
}