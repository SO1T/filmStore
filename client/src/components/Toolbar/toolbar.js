import React, { Component } from 'react';
import {
    InputGroup,
    InputGroupButtonDropdown,
    InputGroupDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroupText,
    InputGroupButton
} from 'reactstrap';
import { connect} from "react-redux";
import { sortFilm, findFilmBy } from '../../actions/filmAction';

class Toolbar extends Component {
    state = {
        dropdownOpen: false,
        searchBy: 'Name',
        order: 'ASC',
        input: ''
    };

    search = (e) => {
        this.props.findFilmBy(this.state.searchBy, e.target.value);
    };

    toggleDropDown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    selectDropDown = (e) => {
        this.setState({
            searchBy: e
        })
    };

    sort = () => {
        this.props.sortFilm(this.state.order);
        this.setState(state => ({
           order: state.order === 'ASC' ? 'DESC' : 'ASC'
        }));
    };

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupButton color="info" info onClick={this.sort}>Sort</InputGroupButton>
                    <InputGroupText>Search by</InputGroupText>
                    <InputGroupButtonDropdown addonType="select" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle caret color="success" success>
                            {this.state.searchBy}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.selectDropDown.bind(this, 'Name')}>Name</DropdownItem>
                            <DropdownItem onClick={this.selectDropDown.bind(this, 'Star')}>Star</DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input onChange={this.search} />
                </InputGroup>
            </div>
        );
    }
}

export default connect(null, { sortFilm, findFilmBy })(Toolbar);