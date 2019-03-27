import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Container,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';
import FilmModal from "../FilmModal/filmModal";
import RegisterModal from '../auth/RegisterModal';

class NavBar extends Component {
    state = {
        collapse: false
    };

    toggle = () => {
        this.setState(state => ({
            collapse: !state.collapse
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
                                    <FilmModal />
                                </NavItem>
                                <NavItem>
                                    <RegisterModal />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
};

export default NavBar;