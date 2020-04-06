import React, { Component } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

export class SignUp extends Component
{
    state = {
        FirstName: '',
        LastName: '',
        Email: '',
        UserName: '',
        Password: '',
        PasswordConfirm: '',
        error: null,
        msg: null
    };

    static propTypes = {
        isAwaitingConfirm: PropTypes.bool,
        confirmMsg: PropTypes.string,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps)
    {
        const { error, isAwaitingConfirm, confirmMsg } = this.props;
        if (error !== prevProps.error)
        {
            if (error.id === 'REGISTER_FAIL')
            {
                // {state: propType.ReducerState.error}
                this.setState({ error: error.error.error});
            }
            else
            {
                this.setState({ error: null });
            }
        }

        if (confirmMsg !== prevProps.confirmMsg)
        {
            if (isAwaitingConfirm)
            {
                this.props.clearErrors();
                this.setState({ msg: confirmMsg });
            }
            else
            {
                this.setState({ msg: null });
            }
        }
    };

    onChange = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e =>
    {
        e.preventDefault();

        const{ FirstName, LastName, Email, UserName, Password, PasswordConfirm } = this.state;

        const newUser = {
            FirstName,
            LastName,
            Email,
            UserName,
            Password,
            PasswordConfirm
        };

        this.props.register(newUser);
    }

    render()
    {
        return(
            <div>
            <Card style={{width: '60rem', margin: 'auto', padding: '25px'}}>
            <Card.Header className="text-center" as="h5">Sign Up</Card.Header>
            <Form className="mx-xl-2">
            { this.state.error ? (<Alert variant="danger" style={{ marginTop: "1rem" }}>{this.state.error}</Alert>) : null }
            { this.state.msg ? (<Alert variant="success" style={{ marginTop: "1rem" }}>{this.state.msg}</Alert>) : null}
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="FirstName" onChange={this.onChange}/>
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="LastName" onChange={this.onChange}/>
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="Email" onChange={this.onChange}/>
                </Form.Group>

                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="UserName" onChange={this.onChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="Password" onChange={this.onChange}/>
                </Form.Group>

                <Form.Group controlId="formPasswordRetype">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="PasswordConfirm" onChange={this.onChange}/>
                </Form.Group>
                

                <Button variant="primary" type="submit" onClick={this.onSubmit}>
                    Register
                </Button>
            </Form>
            </Card>
            </div>
        );
    }
}

const mapStateToProps = state =>
({
    isAwaitingConfirm: state.auth.isAwaitingConfirm,
    confirmMsg: state.auth.confirmMsg,
    error: state.error
});

export default connect(
    mapStateToProps,
    { register, clearErrors }
)(SignUp);