import React, { Component, Fragment } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCategories } from '../actions/categoriesAction';
import store from '../store';

export class Dashboard extends Component
{
    static propTypes = {
        auth: PropTypes.object.isRequired,
        hasDashboard: PropTypes.bool.isRequired,
        account: PropTypes.object
    }

    componentDidMount()
    {
        store.dispatch(loadCategories());
    }

    render()
    {
        const { hasDashboard } = this.props;

        const startDashboard = (
            <Fragment>
                <Card.Body style={{margin: 'auto'}}>This dashboard looks empty. Let's get started on it!</Card.Body>
                <Button variant="primary" href="/categories" style={{ margin: 'auto' }}>Start a Budget Guru</Button>
            </Fragment>
        );

        const loadDashboard = (
            <Fragment>
                <Button variant="primary" href="/categories" style={{ margin: 'auto' }}>Edit Budget Guru</Button>
            </Fragment>
        );

        return(
            <div>
                <Card style={{width: '60rem', margin: 'auto', padding: '25px'}}>
                    {hasDashboard ? loadDashboard : startDashboard}
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    hasDashboard: state.dashboard.hasDashboard,
    account: state.categories.account
})

export default connect(mapStateToProps, null)(Dashboard);