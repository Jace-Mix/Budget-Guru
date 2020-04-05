import React, { Component }  from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component
{
    state = {
        modal: false,
        FirstName: '',
        LastName: '',
        Email: '',
        UserName: '',
        Password: '',
        error: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps)
    {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error)
        {
            // Check for register error
            if (error.id === 'REGISTER_FAIL')
            {
                this.setState({ error: error.error.error});
            }
            else
            {
                this.setState({ error: null});
            }
        }

        // If authenticated, close modal
        if (this.state.modal)
        {
            if (isAuthenticated)
            {
                this.toggle();
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

        const { FirstName, LastName, Email, UserName, Password } = this.state;

        // Create user object
        const newUser = {
            FirstName,
            LastName,
            Email,
            UserName,
            Password
        };

        // Attempt to register
        this.props.register(newUser);
    };

    render()
    {
        return(
            <div>
                <Button color="primary" type="button" className="mr-sm-2" href="#" onClick={this.toggle}>Sign Up</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.error ? (<Alert color="danger">{this.state.error}</Alert>) : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="FirstName">First Name</Label>
                                <Input type="text" name="FirstName" id="FirstName" className="mb-3" onChange={this.onChange}/>
                                <Label for="LastName">Last Name</Label>
                                <Input type="text" name="LastName" id="LastName" className="mb-3" onChange={this.onChange}/>
                                <Label for="Email">Email</Label>
                                <Input type="email" name="Email" id="Email" className="mb-3" onChange={this.onChange}/>
                                <Label for="UserName">Username</Label>
                                <Input type="text" name="UserName" id="userName" className="mb-3" onChange={this.onChange}/>
                                <Label for="Password">Password</Label>
                                <Input type="password" name="Password" id="Password" className="mb-3" onChange={this.onChange}/>
                                <Button color="primary" style={{ marginTop: '2rem' }} block>Create Account</Button>
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
    { register, clearErrors }
)(RegisterModal);