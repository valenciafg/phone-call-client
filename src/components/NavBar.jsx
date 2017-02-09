import React, {Component} from 'react';
import { Nav, Navbar, MenuItem, NavDropdown } from 'react-bootstrap';
import { Route, RouteHandler, Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';

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
                        <LinkContainer to="/">
                            <MenuItem eventKey={1.1}>Summary</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                            <MenuItem disabled>Searchs</MenuItem>
                        <MenuItem divider />
                            <LinkContainer to="extension">
                                <MenuItem eventKey={1.2}>Extensions</MenuItem>
                            </LinkContainer>
                            <MenuItem eventKey={1.3}>Rooms</MenuItem>
                            <MenuItem eventKey={1.4}>Date</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}
