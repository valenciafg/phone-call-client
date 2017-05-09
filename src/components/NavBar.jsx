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
                        <img src="public/hotel_logof.png" alt="Hotel Plaza Merú" style={{width: '100%', height:'100%'}}/>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight style={{paddingTop:20}}>
                    <NavDropdown eventKey={1} title="Calls" id="basic-nav-dropdown">                        
                        <LinkContainer to={{pathname: '/'}}>
                            <MenuItem eventKey={1.1}>Summary</MenuItem>
                        </LinkContainer>
                        <LinkContainer to={{pathname: '/login'}}>
                            <MenuItem eventKey={1.2}>Login</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                            <MenuItem disabled>Searchs</MenuItem>
                        <MenuItem divider />
                            <LinkContainer to={{pathname: '/extension'}}>
                                <MenuItem eventKey={1.3}>Extensions</MenuItem>
                            </LinkContainer>
                            <LinkContainer to={{pathname: '/name'}}>
                                <MenuItem eventKey={1.4}>Name</MenuItem>
                            </LinkContainer>
                            <LinkContainer to={{pathname: '/date'}}>
                                <MenuItem eventKey={1.5}>Date</MenuItem>
                            </LinkContainer>
                        <MenuItem divider />
                            <MenuItem disabled>Information</MenuItem>
                        <MenuItem divider />
                            <LinkContainer to={{pathname: '/directory'}}>
                                <MenuItem eventKey={1.6}>Phone Directory</MenuItem>
                            </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}
