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
                        <LinkContainer to={{pathname: '/'}}>
                            <MenuItem eventKey={1.1}>Summary</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                            <MenuItem disabled>Searchs</MenuItem>
                        <MenuItem divider />
                            <LinkContainer to={{pathname: '/extension'}}>
                                <MenuItem eventKey={1.2}>Extensions</MenuItem>
                            </LinkContainer>
                            <LinkContainer to={{pathname: '/name'}}>
                                <MenuItem eventKey={1.3}>Name</MenuItem>
                            </LinkContainer>
                            <LinkContainer to={{pathname: '/date'}}>
                                <MenuItem eventKey={1.4}>Date</MenuItem>
                            </LinkContainer>
                        <MenuItem divider />
                            <MenuItem disabled>Information</MenuItem>
                        <MenuItem divider />
                            <LinkContainer to={{pathname: '/directory'}}>
                                <MenuItem eventKey={1.5}>Phone Directory</MenuItem>
                            </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}
