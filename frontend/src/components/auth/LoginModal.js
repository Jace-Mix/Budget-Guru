import React, { Component }  from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component
{
    state = {
        modal: false,
        UserName: '',
        Password: '',
        error: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps)
    {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error)
        {
            // Check for register error
            if (error.id === 'LOGIN_FAIL')
            {
                this.setState({ error: error.error.error});
            }
            else
            {
                this.setState({ error: null });
            }
        }

        // If authenticated, close modal
        if (this.state.modal)
        {
            if (isAuthenticated)
            {
                // this.toggle();
                window.location.href = '/cards';
            }
        }
    }

    toggle = () =>
    {
        // Clear Errors
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e =>
    {
        e.preventDefault();

        const { UserName, Password } = this.state;

        const user = {
            UserName,
            Password
        }

        // Attempt to login
        this.props.login(user);
    };

    render()
    {
        return(
            <div>
                <Button type="button" className="mr-sm-2" onClick={this.toggle}>Login</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.error ? (<Alert color="danger">{this.state.error}</Alert>) : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="UserName">Username</Label>
                                <Input type="text" name="UserName" id="userName" className="mb-3" onChange={this.onChange}/>
                                <Label for="Password">Password</Label>
                                <Input type="password" name="Password" id="Password" className="mb-3" onChange={this.onChange}/>
                                <Button color="dark" style={{ marginTop: '2rem' }} block>Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state =>
({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(LoginModal);