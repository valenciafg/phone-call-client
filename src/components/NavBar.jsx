import React, {Component} from 'react';
import { Nav, Navbar, MenuItem, NavDropdown } from 'react-bootstrap';

export default class NavBar extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render(){
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Hotel Plaza Merú</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavDropdown eventKey={1} title="Calls" id="basic-nav-dropdown">
                        <MenuItem eventKey={1.1}>Summary</MenuItem>
                        <MenuItem divider />
                            <MenuItem disabled>Searchs</MenuItem>
                        <MenuItem divider />
                            <MenuItem eventKey={1.2}>Extensions</MenuItem>
                            <MenuItem eventKey={1.3}>Rooms</MenuItem>
                            <MenuItem eventKey={1.4}>Date</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

