import React, { Component } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSpent } from '../../actions/dashboardAction';
import { clearErrors } from '../../actions/errorActions';
import store from '../../store';
import { TOGGLE_BUDGET } from '../../actions/types';

class SpentModal extends Component
{
    state = {
        modal: false,
        Spent: 0,
        error: null
    }

    static propTypes = {
        budgetUpdate: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired,
        updateSpent: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps)
    {
        const { error, budgetUpdate } = this.props;
        if (error !== prevProps.error)
        {
            if (error.id === 'SPENT_FAIL')
            {
                this.setState({ error: error.error.error });
            }
            else
            {
                this.setState({ error: null });
            }
        }

        if (this.state.modal)
        {
            if (budgetUpdate)
            {
                store.dispatch({ type: TOGGLE_BUDGET });
                this.toggle();
            }
        }
    }

    toggle = () =>
    {
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e =>
    {
        e.preventDefault();

        const { Spent } = this.state;

        const updateAccount = {
            Spent
        };

        this.props.updateSpent(updateAccount);
    }

    render()
    {
        return(
            <div>
                <Button variant="danger" onClick={this.toggle}>Spent</Button>
                <Modal show={this.state.modal} onHide={this.toggle} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Spent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.state.error ? (<Alert variant="danger">{this.state.error}</Alert>) : null }
                        <Form>
                            <Form.Group>
                                <Form.Label>Amount Spent</Form.Label>
                                <Form.Control type="number" name="Spent" id="Spent" className="mb-3" min="0" onChange={this.onChange}/>
                                <Button variant="primary" style={{ marginTop: '2rem' }} onClick={this.onSubmit}>Update Budget</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => 
({
    budgetUpdate: state.dashboard.budgetUpdate,
    error: state.error
});

export default connect(
    mapStateToProps,
    { updateSpent, clearErrors }
)(SpentModal);