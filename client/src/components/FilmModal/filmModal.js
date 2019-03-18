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
        Title: '',
        Release: '',
        Format: '',
        Stars: '',
        file: null,
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleFile = (e) => {
        this.setState({
            file: e.target.files[0],
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newFilm = {
            Title: this.state.Title,
            Release: this.state.Release,
            Format: this.state.Format,
            Stars: this.state.Stars
        };
        this.props.uploadFilms(this.state.file);
        this.props.addFilm(newFilm);
        this.props.toggleButton();
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
                                <Label for="Title">Title: </Label>
                                <Input
                                    type="text"
                                    name="Title"
                                    id="Title"
                                    pattern="[A-Za-z1-9]"
                                    placeholder="Title"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Release">Release: </Label>
                                <Input
                                    type="text"
                                    name="Release"
                                    id="Release"
                                    placeholder="Release"
                                    pattern="[1-9]"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Format">Format: </Label>
                                <Input
                                    type="text"
                                    name="Format"
                                    id="Format"
                                    placeholder="Format"
                                    pattern="[A-Za-z1-9]"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Stars">Stars: </Label>
                                <Input
                                    type="text"
                                    name="Stars"
                                    id="Stars"
                                    placeholder="Stars"
                                    pattern="[A-Za-z]"
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