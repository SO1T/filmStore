import React, { Component } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupDropdown,
    Input,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroupText,
    InputGroupButton
} from 'reactstrap';

class Toolbar extends React.Component {
    state = {
            dropdownOpen: false,
            searchBy: 'Name'
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

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupButton color="info" info>Sort</InputGroupButton>
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
                    <Input />
                </InputGroup>
            </div>
        );
    }
}

export default Toolbar;