import React, {Fragment, Component} from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';

export class PageTitle extends Component
{
    configureHeaderName()
    {
        var _ud;
        if ((_ud = localStorage.getItem('user_data')) === null)
        {
            return(<Navbar.Brand className="mx-auto">Welcome!</Navbar.Brand>);
        }
        var ud = JSON.parse(_ud);
        var firstName = ud.firstName;
        var lastName = ud.lastName;
        return(<Navbar.Brand className="mx-auto">Logged in as {firstName} {lastName}</Navbar.Brand>);
    }

    logout = event =>
    {
        localStorage.removeItem("user_data");
        window.location.href = '/';
    }

    configureHeaderButtons()
    {
        if (localStorage.getItem('user_data') === null)
        {
            return(
                <Fragment>
                <Button type="button" className="mr-sm-2" href="/login">Sign In</Button>
                <Button type="button" className="mr-sm-2" href="/signup">Sign Up</Button>
                </Fragment>
            )
        }
        else
        {
            return(
                <Fragment>
                    <Button type="button" className="mr-sm-2" href="/cards">My Dashboard</Button>
                    <Button type="button" variant="outline-primary" className="mr-sm-2" onClick={this.logout}>Log Out</Button>
                </Fragment>
            )
        }
    }

    render()
    {
        return(
            <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Budget Guru</Navbar.Brand>
        {this.configureHeaderName()}
        <Nav className="ml-auto">
          {this.configureHeaderButtons()}
        </Nav>
      </Navbar>
        );
    }
}

export default PageTitle;