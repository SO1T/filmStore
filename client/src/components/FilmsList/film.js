import React, { Component } from 'react';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Collapse,
    Button,
    CardGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import { deleteFilm } from "../../actions/filmAction";

class Film extends Component {
    state = {
        collapse: false,
        delete: false
    };

    toggle = () => {
        this.setState(state => ({
           collapse: !state.collapse
        }))
    };

    toggleClick = () => {
        this.setState(state => ({
            delete: !state.delete
        }))
    };

    delete = () => {
        this.props.deleteFilm(this.props._id);
    };

    render() {
        const { _id, name, year, format, stars, deleteItem } = this.props;
        return (
            <div className="film-card">
                <Card className="card">
                    <div onClick={this.toggleClick}>
                        <CardBody>
                            <CardTitle>name: {name}</CardTitle>
                            <CardSubtitle>Year: {year}</CardSubtitle>
                        </CardBody>
                        <Collapse isOpen={this.state.collapse}>
                            <CardBody>
                                <CardText>Format: {format}</CardText>
                                <CardText>Stars: {stars}</CardText>
                            </CardBody>
                        </Collapse>
                    </div>
                    <Button color="dark" onClick={this.toggle}>Expand</Button>
                </Card>
                {this.state.delete && (<Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.delete}>&times;</Button>)}
            </div>
        );
    }
}

export default connect(null, { deleteFilm })(Film);