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
    FormText,
    NavLink
} from 'reactstrap';
import { connect } from "react-redux";
import { addFilm, uploadFilms } from "../../actions/filmAction";

class FilmModal extends Component{
    state = {
        Title: '',
        Release: '',
        Format: '',
        Stars: '',
        file: null,
        modal: false,
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
            Stars: JSON.stringify(this.state.Stars.trim().split(', '))
        };
        this.props.uploadFilms(this.state.file);
        this.props.addFilm(newFilm);
        this.toggle();
    };

    toggle = () => {
      this.setState({
          modal: !this.state.modal
      });
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle}>
                    Add films
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
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
                                    pattern=".*[A-Za-z1-9]"
                                    placeholder="Title"
                                    title="It must be latters or nums"
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
                                    pattern=".*[1-9]"
                                    title="It must be num"
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
                                    pattern=".*[A-Za-z1-9]"
                                    title="It must be latters or nums"
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
                                    pattern=".*[A-Za-z]"
                                    onChange={this.onChange}
                                />
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

export default connect(null, { addFilm, uploadFilms })(FilmModal);
