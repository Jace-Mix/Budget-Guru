import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { confirm } from '../../actions/authActions';
import PropTypes from 'prop-types';

export class Confirm extends Component
{
    static propTypes = {
        confirm: PropTypes.func.isRequired
    };

    render()
    {
        return(
            <Jumbotron fluid>
                <Container>
                    {this.props.confirm}
                    <h1>Thank you for confirming your email</h1>
                        <p>
                            You can now log into your custom account!
                        </p>
                </Container>
            </Jumbotron>
        );
    }
}

export default connect(null,
    { confirm }
)(Confirm);