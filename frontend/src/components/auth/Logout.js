import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component
{
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render()
    {
        return (
            <Fragment>
                <Button variant="light" onClick={this.props.logout} href="/">Logout</Button>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { logout }
)(Logout);
