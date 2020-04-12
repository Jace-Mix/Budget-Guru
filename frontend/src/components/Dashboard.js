import React, { Component, Fragment } from 'react';
import { Card, Button, Container, Row, Col, Form, Alert, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCategories } from '../actions/categoriesAction';
import { Doughnut } from 'react-chartjs-2';
import { clearErrors } from '../actions/errorActions';
import { updateSpent, clearMsg, updateEarned } from '../actions/dashboardAction';
import store from '../store';

export class Dashboard extends Component
{
    state = {
        spentModal: false,
        earnedModal: false,
        Budget: 0,
        Earned: 0,
        newEarned: 0,
        Spent: 0,
        newSpent: 0,
        Clothing: 0,
        FoodDrink: 0,
        Home: 0,
        Entertainment: 0,
        Transportation: 0,
        Health: 0,
        Misc: 0,
        Category: '',
        dataDoughnut: {
            labels: ["Clothing", "Food/Drink", "Home", "Entertainment", "Transportation", "Health", "Miscellaneous"],
            datasets: [
                {
                    data: [5, 5, 5, 5, 5, 5, 5],
                    backgroundColor: ["#F7464A", "#EE961E", "#FDB45C", "#46BFBD", "#1EACEE", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: ["#FF5A5E", "#FFC371", "#FFC870", "#5AD3D1", "#5ACBFF", "#A8B3C5", "#616774"]
                }
            ],
        },
        error: null,
        msg: null,
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        changeMsg: PropTypes.string,
        clearErrors: PropTypes.func.isRequired,
        clearMsg: PropTypes.func.isRequired,
        updateSpent: PropTypes.func.isRequired,
        updateEarned: PropTypes.func.isRequired,
        hasDashboard: PropTypes.bool.isRequired,
        account: PropTypes.object
    }

    componentDidMount()
    {
        store.dispatch(loadCategories());
    }

    componentDidUpdate(prevProps)
    {
        const { account, error, changeMsg } = this.props;

        if (error !== prevProps.error)
        {
            if (error.id === 'SPENT_FAIL' || error.id === 'EARNED_FAIL')
            {
                this.props.clearMsg();
                this.setState({ error: error.error.error })
            }
            else
            {
                this.setState({ error: null });
            }
        }

        if (changeMsg !== prevProps.changeMsg)
        {
            if (changeMsg)
            {
                this.props.clearErrors();
                this.setState({ msg: changeMsg });
            }
            else
            {
                this.setState({ msg: null });
            }
        }

        if (account !== prevProps.account)
        {
            if (account)
            {
                let dataCopy = {...this.state.dataDoughnut};
                dataCopy.datasets[0].data[0] = parseFloat(account.CalculatedCategory.Clothing).toFixed(2);
                dataCopy.datasets[0].data[1] = parseFloat(account.CalculatedCategory.FoodDrink).toFixed(2);
                dataCopy.datasets[0].data[2] = parseFloat(account.CalculatedCategory.Home).toFixed(2);
                dataCopy.datasets[0].data[3] = parseFloat(account.CalculatedCategory.Entertainment).toFixed(2);
                dataCopy.datasets[0].data[4] = parseFloat(account.CalculatedCategory.Transportation).toFixed(2);
                dataCopy.datasets[0].data[5] = parseFloat(account.CalculatedCategory.Health).toFixed(2);
                dataCopy.datasets[0].data[6] = parseFloat(account.CalculatedCategory.Misc).toFixed(2);
                this.setState({
                    Budget: parseFloat(account.Budget).toFixed(2),
                    Spent: parseFloat(account.Spent).toFixed(2),
                    Clothing: parseFloat(account.CalculatedCategory.Clothing).toFixed(2),
                    FoodDrink: parseFloat(account.CalculatedCategory.FoodDrink).toFixed(2),
                    Home: parseFloat(account.CalculatedCategory.Home).toFixed(2),
                    Entertainment: parseFloat(account.CalculatedCategory.Entertainment).toFixed(2),
                    Transportation: parseFloat(account.CalculatedCategory.Transportation).toFixed(2),
                    Health: parseFloat(account.CalculatedCategory.Health).toFixed(2),
                    Misc: parseFloat(account.CalculatedCategory.Misc).toFixed(2),
                    dataDoughnut: dataCopy
                });
            }
        }
    }

    toggleEarned = () =>
    {
        this.props.clearErrors();
        this.props.clearMsg();

        this.setState({
            earnedModal: !this.state.earnedModal,
            newEarned: 0,
        })
    }

    toggleSpent = () =>
    {
        this.props.clearErrors();
        this.props.clearMsg();

        this.setState({
            spentModal: !this.state.spentModal,
            newSpent: 0,
        });
    }

    onChange = e =>
    {
        if (e.target.value === '')
        {
            this.setState({ [e.target.name]: 0});
        }
        else
        {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    radioChange = e =>
    {
        this.setState({ Category: e.target.value });
    }

    onSubmitSpent = e =>
    {
        e.preventDefault();

        const { newSpent, Category } = this.state;

        const updateAccount = {
            Spent: newSpent,
            Category
        };

        this.props.updateSpent(updateAccount);
    }

    onSubmitEarned = e =>
    {
        e.preventDefault();

        const { newEarned } = this.state;

        const updateAccount = {
            Earned: newEarned
        };

        this.props.updateEarned(updateAccount);
    }

    render()
    {
        const { hasDashboard } = this.props;
        const { user } = this.props.auth;

        const startDashboard = (
            <Fragment>
                <Card.Body style={{margin: 'auto'}}>This dashboard looks empty. Let's get started on it!</Card.Body>
                <Button variant="primary" href="/categories" style={{ margin: 'auto' }}>Start a Budget Guru</Button>
            </Fragment>
        );

        const loadDashboard = (
            <Fragment>
                <Card.Header className="text-center" as="h5"><strong>{user ? `${user.FirstName} ${user.LastName}'s Budget Guru`: ''}</strong></Card.Header>
                <br />
                <Container fluid="true">
                    <Row>
                        <Col xs={8}>
                            <br />
                            <Doughnut data={this.state.dataDoughnut} options={{ responsive: true, legend: {position: 'left'}}}/>
                        </Col>
                        <Col>
                            <Card style={{width: '22rem', margin: 'auto', padding: '10px'}}>
                                <Card.Header className="text-center" as="h5">Review</Card.Header>
                                <br />
                                <Card.Title className="text-center">{`Current Budget: $${this.state.Budget}`}</Card.Title>
                                <Card.Title className="text-center">{`Amount Spent: $${this.state.Spent}`}</Card.Title>
                                <br />
                                <Card.Footer>
                                    <Card.Text>{`Clothing: $${this.state.Clothing}`}</Card.Text>
                                    <Card.Text>{`Food/Drink: $${this.state.FoodDrink}`}</Card.Text>
                                    <Card.Text>{`Home: $${this.state.Home}`}</Card.Text>
                                    <Card.Text>{`Entertainment: $${this.state.Entertainment}`}</Card.Text>
                                    <Card.Text>{`Transportation: $${this.state.Transportation}`}</Card.Text>
                                    <Card.Text>{`Health: $${this.state.Health}`}</Card.Text>
                                    <Card.Text>{`Misc: $${this.state.Misc}`}</Card.Text>
                                    <Row>
                                        <Col>
                                            <Button variant="success" onClick={this.toggleEarned}>Earned</Button>
                                            <Modal show={this.state.earnedModal} onHide={this.toggleEarned} animation={true}>
                                                <Modal.Header closeButton={this.toggleEarned}>
                                                    <Modal.Title>Update Budget</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    { this.state.error ? (<Alert variant="danger" style={{ marginTop: "1rem" }}>{this.state.error}</Alert>) : null}
                                                    { this.state.msg ? (<Alert variant="success" style={{ marginTop: "1rem" }}>{this.state.msg}</Alert>) : null}
                                                    <Form>
                                                        <Form.Group>
                                                            <Form.Label>Amount Earned</Form.Label>
                                                            <Form.Control type="number" name="newEarned" min="0" onChange={this.onChange}/>
                                                            <Button variant="primary" style={{ marginTop: '2rem' }} onClick={this.onSubmitEarned}>Update Budget</Button>
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                            </Modal>
                                        </Col>
                                        <Col>
                                            <Button variant="danger" onClick={this.toggleSpent}>Spent</Button>
                                            <Modal show={this.state.spentModal} onHide={this.toggleSpent} animation={true}>
                                                <Modal.Header closeButton={this.toggleSpent}>
                                                    <Modal.Title>Add Spent</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    { this.state.error ? (<Alert variant="danger" style={{ marginTop: "1rem" }}>{this.state.error}</Alert>) : null}
                                                    { this.state.msg ? (<Alert variant="success" style={{ marginTop: "1rem" }}>{this.state.msg}</Alert>) : null}
                                                    <Form>
                                                        <Form.Group>
                                                            <Form.Label>Amount Spent</Form.Label>
                                                            <Form.Control type="number" name="newSpent" min="0" onChange={this.onChange}/>
                                                            <br />
                                                            <Form.Check type="radio" name="groupChecks" value="Clothing" checked={this.state.Category === 'Clothing'} onChange={this.radioChange} label="Clothing"/>
                                                            <Form.Check type="radio" name="groupChecks" value="FoodDrink" checked={this.state.Category === 'FoodDrink'} onChange={this.radioChange} label="Food/Drinks"/>
                                                            <Form.Check type="radio" name="groupChecks" value="Home" checked={this.state.Category === 'Home'} onChange={this.radioChange} label="Home"/>
                                                            <Form.Check type="radio" name="groupChecks" value="Entertainment" checked={this.state.Category === 'Entertainment'} onChange={this.radioChange} label="Entertainment"/>
                                                            <Form.Check type="radio" name="groupChecks" value="Transportation" checked={this.state.Category === 'Transportation'} onChange={this.radioChange} label="Transportation"/>
                                                            <Form.Check type="radio" name="groupChecks" value="Health" checked={this.state.Category === 'Health'} onChange={this.radioChange} label="Health"/>
                                                            <Form.Check type="radio" name="groupChecks" value="Miscellaneous" checked={this.state.Category === 'Miscellaneous'} onChange={this.radioChange} label="Miscellaneous"/>
                                                            <Button variant="primary" style={{ marginTop: '2rem' }} onClick={this.onSubmitSpent}>Update Budget</Button>
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                            </Modal>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <br />
                <Button variant="primary" href="/categories" style={{ margin: 'auto' }}>Edit Budget Guru</Button>
            </Fragment>
        );

        return(
            <div>
                <Card style={{width: '90rem', margin: 'auto', padding: '25px'}}>
                    {hasDashboard ? loadDashboard : startDashboard}
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
    hasDashboard: state.dashboard.hasDashboard,
    account: state.categories.account,
    changeMsg: state.dashboard.changeMsg
})

export default connect(mapStateToProps, {clearErrors, loadCategories, updateSpent, clearMsg, updateEarned})(Dashboard);