import React, { Component, Fragment } from 'react';
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
import Logout from '../auth/logout';
import LoginModal from '../auth/loginModal';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

class NavBar extends Component {
    state = {
        collapse: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState(state => ({
            collapse: !state.collapse
        }))
    };

    render() {

        const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <FilmModal />
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

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
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(NavBar);