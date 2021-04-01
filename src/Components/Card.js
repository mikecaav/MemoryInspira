import {Component} from "react";
import {Image} from "react-bootstrap";

export class Card extends Component {
    render() {
        return <Image src={this.props.filename} rounded
                      style={{height: "100", width: "100%"}}
        />
    }
}