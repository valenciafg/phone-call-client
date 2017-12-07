import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, MenuItem, NavDropdown } from 'react-bootstrap';
import { Route, RouteHandler, Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';
import { logoutUser } from '../actions/Auth';

class NavBar extends React.Component {
    constructor(...args) {
        super(...args)
        this.logout = this.logout.bind(this)
    }
    logout(e){
        this.props.logoutUser();
    }
    render(){
        const { loggedin } = this.props.auth;
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src="public/hotel_logof.png" alt="Hotel Plaza Merú" style={{width: '100%', height:'100%'}}/>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight style={{paddingTop:20}}>
                    {loggedin?
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
                        <LinkContainer to={{pathname: '/extname'}}>
                            <MenuItem eventKey={1.5}>External Phone</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                            <MenuItem disabled>Information</MenuItem>
                        <MenuItem divider />
                        <LinkContainer to={{pathname: '/directory'}}>
                            <MenuItem eventKey={1.6}>Phone Directory</MenuItem>
                        </LinkContainer>
                        <LinkContainer to={{pathname: '/extdirectory'}}>
                            <MenuItem eventKey={1.7}>External Phone Directory</MenuItem>
                        </LinkContainer>
                        <LinkContainer to={{pathname: '/mcphone'}}>
                            <MenuItem eventKey={1.8}>More Called Phone</MenuItem>
                        </LinkContainer>
                        <LinkContainer to={{pathname: '/topdurationcalls'}}>
                            <MenuItem eventKey={1.8}>Top Duration Calls</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                            <MenuItem disabled>Authentication</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={1.9} onClick={this.logout}>Logout</MenuItem>
                    </NavDropdown>
                    :
                    <NavDropdown eventKey={1} title="Calls" id="basic-nav-dropdown">
                        <MenuItem divider />
                            <MenuItem disabled>Information</MenuItem>
                        <MenuItem divider />
                        <LinkContainer to={{pathname: '/directory'}}>
                            <MenuItem eventKey={1.1}>Phone Directory</MenuItem>
                        </LinkContainer>
                        <LinkContainer to={{pathname: '/extdirectory'}}>
                            <MenuItem eventKey={1.2}>External Phone Directory</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                            <MenuItem disabled>Authentication</MenuItem>
                        <MenuItem divider />
                        <LinkContainer to={{pathname: '/login'}}>
                            <MenuItem eventKey={1.3}>Login</MenuItem>
                        </LinkContainer>                                               
                    </NavDropdown>
                    }
                </Nav>
            </Navbar>
        );
    }
}
function mapStateToProps(state){
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps,{ logoutUser })(NavBar)