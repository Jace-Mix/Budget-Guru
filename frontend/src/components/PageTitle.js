import React, { Fragment, Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from './auth/Logout';
import '../css styles/myStyles.css';

var outputStr;
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
                        <strong style={{fontSize: '20px'}}>{ user ? `Welcome, ${user.FirstName} ${user.LastName}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Button variant="light" type="button" className="mr-sm-2" href="/dashboard">My Dashboard</Button>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
              <Fragment>
                  <NavItem>
                      <Button variant="light" type="button" className="mr-sm-2" href="/login">Login</Button>
                  </NavItem>
                  <NavItem>
                      <Button variant="light" type="button" className="mr-sm-2" href="/signup">Sign Up</Button>
                  </NavItem>
              </Fragment>
          );

        return(
            <Navbar className='navbar_color'>

                <img src="piggy-bank-icon.png" alt="" width="50" height="50"/>
                <Navbar.Brand href = {isAuthenticated ? "/dashboard" : "/"} style={{color: "rgb(23,68,46)", fontSize: "30px", fontWeight: "400", marginLeft: "1rem"}}>
                Budget Guru
                </Navbar.Brand>
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
