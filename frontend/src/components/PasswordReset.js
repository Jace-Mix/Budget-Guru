import React, { Component } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

export class PasswordReset extends Component
{
    state = {
        Email: '',
        Password: '',
        PasswordConfirm: '',
        error: null,
        msg: null,
    }

    static propTypes = {
        isAwaitingConfirm: PropTypes.bool,
        confirmMsg: PropTypes.string,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps)
    {
        const { error, isAwaitingConfirm, confirmMsg } = this.props;
        if (error !== prevProps.error)
        {
            if (error.id === 'LOGIN_FAIL')
            {
                // {state: propType.ReducerState.error}
                this.setState({ error: error.error.error });
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

        const { Email, Password, PasswordConfirm } = this.state;

        const submit = {
            Email,
            Password,
            PasswordConfirm
        }

        this.props.reset(submit)
    }

    render()
    {
        return(
            <div>
                <br />
                <Card style={{width: '60rem', margin: 'auto', padding: '25px'}}>
                    <Card.Header className="text-center" as="h5">Password Reset</Card.Header>
                    <Form className="mx-sm-3">
                        {this.state.error ? (<Alert variant="danger" style={{ marginTop: "1rem"}}>{this.state.error}</Alert>) : null}
                        {this.state.msg ? (<Alert variant="success" style={{ marginTop: "1rem"}}>{this.state.msg}</Alert>) : null}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="Email" placeholder="Enter Email" onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="Password" placeholder="Password" onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPasswordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="PasswordConfirm" placeholder="Retype Password" onChange={this.onChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" id="submitButton" onClick={this.onSubmit}>Submit</Button>
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
})

export default connect(
    mapStateToProps,
    { reset, clearErrors }
)(PasswordReset);