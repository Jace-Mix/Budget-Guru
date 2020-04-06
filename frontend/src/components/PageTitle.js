import React, { Fragment, Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from './auth/Logout';

export class PageTitle extends Component
{
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render()
    {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome, ${user.FirstName} ${user.LastName}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Button type="button" className="mr-sm-2" href="/cards">My Dashboard</Button>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <Button type="button" className="mr-sm-2" href="/login">Login</Button>
                </NavItem>
                <NavItem>
                    <Button type="button" className="mr-sm-2" href="/signup">Sign Up</Button>
                </NavItem>
            </Fragment>
        );

        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Budget Guru</Navbar.Brand>  
                <Nav className="ml-auto">
                    {isAuthenticated ? authLinks : guestLinks}
                </Nav>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(PageTitle);