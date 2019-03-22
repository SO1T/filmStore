import React, { Component } from 'react';
import {
    InputGroup,
    InputGroupButtonDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroupText,
    InputGroupButton
} from 'reactstrap';

class Toolbar extends Component {
    render() {
        const { handleSort, dropdownOpen, toggleDropDown, selectDropDown, searchBy, handleInput } = this.props;
        return (
            <div>
                <InputGroup>
                    <InputGroupButton color="info" info onClick={handleSort}>Sort</InputGroupButton>
                    <InputGroupText>Search by</InputGroupText>
                    <InputGroupButtonDropdown addonType="select" isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret color="success" success>
                            {searchBy}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={selectDropDown.bind(this, 'Name')}>Name</DropdownItem>
                            <DropdownItem onClick={selectDropDown.bind(this, 'Star')}>Star</DropdownItem>
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input onChange={handleInput} />
                </InputGroup>
            </div>
        );
    }
}

export default Toolbar;