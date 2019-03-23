import React, { Component } from 'react';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Collapse,
    Button
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
        }));
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
        const { Title, Release, Format, Stars } = this.props;
        return (
            <div className="film-card">
                <Card className="card">
                    <div onClick={this.toggleClick}>
                        <CardBody>
                            <CardTitle>Title: {Title}</CardTitle>
                            <CardSubtitle>Relese: {Release}</CardSubtitle>
                        </CardBody>
                        <Collapse isOpen={this.state.collapse}>
                            <CardBody>
                                <CardText>Format: {Format}</CardText>
                                <CardText>Stars: {JSON.parse(Stars).join(', ')}</CardText>
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