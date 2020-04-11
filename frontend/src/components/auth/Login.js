import React, { Component } from 'react';
import { Card, Form, Button, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';

export class Login extends Component
{
    state = {
        UserName: '',
        Password: '',
        error: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps)
    {
        const {error, isAuthenticated } = this.props;
        if (error !== prevProps.error)
        {
            if (error.id === 'LOGIN_FAIL')
            {
                this.setState({ error: error.error.error });
            }
            else
            {
                this.setState({ error: null });
            }
        }

        if (isAuthenticated)
        {
            window.location.href = '/dashboard';
        }
    }

    onChange = e =>
    {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit = e =>
    {
        e.preventDefault();

        const { UserName, Password } = this.state;

        const user = {
            UserName,
            Password
        };

        // Attempt to login
        this.props.login(user);
    }

    render()
    {
        return(
            <div id="loginDiv">
           <Card style={{width: '60rem', margin: 'auto', padding: '25px'}}>
            <Card.Header className="text-center" as="h5">Login</Card.Header>
           <Form className="mx-sm-3">
           {this.state.error ? (<Alert variant="danger" style={{ marginTop: "1rem"}}>{this.state.error}</Alert>) : null}
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="UserName" placeholder="Enter Username" onChange={this.onChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="Password" placeholder="Password" onChange={this.onChange}/>
                <Form.Text className="text-muted" href="/confirmreset">
                    <a href="/confirmreset">Forgot Password?</a>
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" id="loginButton" onClick={this.onSubmit}>
                Login
            </Button>
            </Form>
            </Card>
       </div>
        );
    }
}

const mapStateToProps = state =>
({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login }
)(Login);