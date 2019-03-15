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

    render() {
        const { id, name, year, format, stars } = this.props;
        return (
            <div className="film-card">
                <Card className="card" onClick={this.toggleClick}>
                    <CardBody>
                        <CardTitle>name: {name}</CardTitle>
                        <CardSubtitle>Year: {year}</CardSubtitle>
                    </CardBody>
                    <Collapse isOpen={this.state.collapse}>
                        <CardBody>
                            <CardText>Format: {format}</CardText>
                            <CardText>Stars: </CardText>
                        </CardBody>
                    </Collapse>
                    <Button color="dark" onClick={this.toggle}>Expand</Button>
                </Card>
                {this.state.delete && (<Card className="card card-del">
                    <i className="fas fa-trash-alt trash"></i>
                </Card>)}
            </div>
        );
    }
};

export default Film;