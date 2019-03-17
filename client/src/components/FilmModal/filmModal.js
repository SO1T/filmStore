import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';
import { connect } from "react-redux";
import { addFilm, uploadFilms } from "../../actions/filmAction";

class ItemModal extends Component{
    state = {
        name: '',
        year: '',
        format: '',
        stars: '',
        file: null,
        loaded: 0
    };

    toggle = () => {
        this.setState(state => ({
            modal: !state.modal
        }));
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleFile = (e) => {
        this.setState({
            file: e.target.files[0],
            loaded: 0
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newFilm = {
            name: this.state.name,
            year: this.state.year,
            format: this.state.format,
            stars: JSON.stringify(this.state.stars.split(', '))
        };
        // this.props.uploadFilms(this.state.file);
        this.props.addFilm(newFilm);
        this.toggle();
    };

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.modal}
                    toggle={this.props.toggleButton}
                >
                    <ModalHeader
                        toggle={this.props.toggleButton}
                    >
                        Add new film
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name: </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    required
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="year">Year: </Label>
                                <Input
                                    type="text"
                                    name="year"
                                    id="year"
                                    placeholder="Year"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="format">Format: </Label>
                                <Input
                                    type="text"
                                    name="format"
                                    id="format"
                                    placeholder="Format"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="stars">Stars: </Label>
                                <Input
                                    type="text"
                                    name="stars"
                                    id="stars"
                                    placeholder="Stars"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="file">File</Label>
                                <Input type="file" name="file" id="file" onChange={this.handleFile} />
                                <FormText color="muted">
                                    You can upload file with films
                                </FormText>
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Add film</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { addFilm, uploadFilms })(ItemModal);