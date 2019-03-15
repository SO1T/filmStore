import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Container,
    NavbarToggler,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import ItemModal from "../FilmModal/filmModal";

class NavBar extends Component {
    state = {
        modal: false,
        collapse: false
    };

    toggle = () => {
        this.setState(state => ({
            collapse: !state.collapse
        }))
    };

    toggleButton = () => {
        this.setState(state => ({
            modal: !state.modal
        }))
    };

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            FilmStore
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.collapse} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button dark color="dark" onClick={this.toggleButton}>Add Film</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                {this.state.modal && <ItemModal modal={this.state.modal} toggleButton={this.toggleButton} />}
            </div>
        );
    }
};

export default NavBar;