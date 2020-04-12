import React, { Component, Fragment } from 'react';
import { Card, Button, InputGroup, FormControl, Form, Container, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateCategories, loadCategories } from '../actions/categoriesAction';
import PropTypes from 'prop-types';
import store from '../store';

export class Categories extends Component
{
    state = {
        setUpAccount: false,
        CategoryPercent: 0,
        MonthlyIncome: 0,
        MonthlyBill: 0,
        Clothing: 0,
        FoodDrink: 0,
        Home: 0,
        Entertainment: 0,
        Transportation: 0,
        Health: 0,
        Misc: 0,
        error: null
    }

    static propTypes = {
        account: PropTypes.object,
        createdBudget: PropTypes.bool,
        hasDashboard: PropTypes.bool.isRequired,
        updateCategories: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidMount()
    {
        store.dispatch(loadCategories());
    }

    componentDidUpdate(prevProps)
    {
        const { error, createdBudget, account } = this.props;

        if (error !== prevProps.error)
        {
            if (error.id === 'CATEGORY_FAIL')
            {
                this.setState({ error: error.error.error });
            }
            else
            {
                this.setState({ error: null });
            }
        }

        if (createdBudget)
        {
            window.location.href = '/dashboard';
        }


        if (account !== prevProps.account && !this.state.setUpAccount)
        {
            if(account)
            {
                this.setState({
                    MonthlyIncome: account.MonthlyIncome,
                    MonthlyBill: account.MonthlyBill,
                    Clothing: account.PercentCategory.Clothing,
                    FoodDrink: account.PercentCategory.FoodDrink,
                    Home: account.PercentCategory.Home,
                    Entertainment: account.PercentCategory.Entertainment,
                    Transportation: account.PercentCategory.Transportation,
                    Health: account.PercentCategory.Health,
                    Misc: account.PercentCategory.Misc,
                    CategoryPercent: parseInt(account.PercentCategory.Clothing)+
                        parseInt(account.PercentCategory.FoodDrink)+
                        parseInt(account.PercentCategory.Home)+
                        parseInt(account.PercentCategory.Entertainment)+
                        parseInt(account.PercentCategory.Transportation)+
                        parseInt(account.PercentCategory.Health)+
                        parseInt(account.PercentCategory.Misc),
                    setUpAccount: true
                })
            }
        }
    }

    onChange = e =>
    {
        var sum = 0;

        // Prevent arbitrarily large category amounts
        if (parseInt(e.target.value) > 999 && e.target.name !== 'MonthlyBill' && e.target.name !== 'MonthlyIncome')
        {
            return;
        }

        // Subtract before updating
        switch(e.target.name)
        {
            case 'Clothing':
                sum = this.state.CategoryPercent - parseInt(this.state.Clothing);
                break;
            case 'FoodDrink':
                sum = this.state.CategoryPercent - parseInt(this.state.FoodDrink);
                break;
            case 'Home':
                sum = this.state.CategoryPercent - parseInt(this.state.Home);
                break;
            case 'Entertainment':
                sum = this.state.CategoryPercent - parseInt(this.state.Entertainment);
                break;
            case 'Transportation':
                sum = this.state.CategoryPercent - parseInt(this.state.Transportation);
                break;
            case 'Health':
                sum = this.state.CategoryPercent - parseInt(this.state.Health);
                break;
            case 'Misc':
                sum = this.state.CategoryPercent - parseInt(this.state.Misc);
                break;
            default:
                sum = -1;
                break;
        }

        // Make sure valid is not null and don't update on the top 2 categories
        if (e.target.value !== "" && e.target.name !== 'MonthlyBill' && e.target.name !== 'MonthlyIncome')
        {
            sum += parseInt(e.target.value);
        }

        // No negative or large numbers
        if (sum >= 0)
        {
            this.setState({ CategoryPercent: sum });
        }

        // Change empty string values to 0
        if (e.target.value === "")
        {
            this.setState({ [e.target.name]: 0});
        }
        else
        {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = e =>
    {
        e.preventDefault();

        const { MonthlyIncome, MonthlyBill, Clothing, FoodDrink, Home, Entertainment, Transportation, Health, Misc } = this.state;

        const categories = {
            MonthlyIncome,
            MonthlyBill,
            Clothing,
            FoodDrink,
            Home,
            Entertainment,
            Transportation,
            Health,
            Misc
        };

        this.props.updateCategories(categories);
    }

    render()
    {
        const monthlyIncome = `$${this.state.MonthlyIncome}`;
        const monthlyBill = `$${this.state.MonthlyBill}`;
        const clothing = `${this.state.Clothing}%`;
        const foodDrink = `${this.state.FoodDrink}%`;
        const home = `${this.state.Home}%`;
        const entertain = `${this.state.Entertainment}%`;
        const transport = `${this.state.Transportation}%`;
        const health = `${this.state.Health}%`;
        const misc = `${this.state.Misc}%`;

        const { hasDashboard } = this.props;

        const createHeader = (
            <Fragment>
                <Card.Header className="text-center" as="h5">Create Budget Guru</Card.Header>
            </Fragment>
        );

        const createButton = (
            <Fragment>
                <Button variant="primary" onClick={this.onSubmit}>Add Budget Guru</Button>
            </Fragment>
        )

        const updateHeader = (
            <Fragment>
                <Card.Header className="text-center" as="h5">Update Budget Guru</Card.Header>
            </Fragment>
        );

        const updateButton = (
            <Fragment>
                <Button variant="primary" onClick={this.onSubmit}>Update Budget Guru</Button>
            </Fragment>
        );

        return(
            <div>
                <Card style={{width: '60rem', margin: 'auto', padding: '25px'}}>
                    { hasDashboard ? updateHeader : createHeader }
                    <br />
                    {this.state.error ? (<Alert variant="danger" style={{ marginTop: "1rem"}}>{this.state.error}</Alert>) : null}
                    <InputGroup size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg">Starting Income</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl name="MonthlyIncome" type="number" min="0" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder={monthlyIncome} onChange={this.onChange}/>
                    </InputGroup>
                    <br />
                    <InputGroup size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg">Starting Bill</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl name="MonthlyBill" type="number" min="0" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder={monthlyBill} onChange={this.onChange}/>
                    </InputGroup>
                    <Form.Text className="text-muted">This will be subtracted from the income to generate your budget</Form.Text>
                    <br />
                    <Card.Title>Categories</Card.Title>
                    { this.state.CategoryPercent === 100 ?  <Alert variant="success" style={{width: "6rem"}}>{this.state.CategoryPercent}%</Alert> : <Alert variant="danger" style={{width: "6rem"}}>{this.state.CategoryPercent}%</Alert> }
                    <Container style={{ margin: "auto"}}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Clothing</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="Clothing" type="number" min="0" max="100" aria-label="Default" aria-describedby="inputGroup-sizing-=default" placeholder={clothing} onChange={this.onChange}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Food/Drink</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="FoodDrink" type="number" min="0" max="100" aria-label="Default" aria-describedby="inputGroup-sizing-=default" placeholder={foodDrink} onChange={this.onChange}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Home</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="Home" type="number" min="0" max="100" aria-label="Default" aria-describedby="inputGroup-sizing-=default" placeholder={home} onChange={this.onChange}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Entertainment</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="Entertainment" type="number" min="0" max="100" aria-label="Default" aria-describedby="inputGroup-sizing-=default" placeholder={entertain} onChange={this.onChange}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Transportation</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="Transportation" type="number" min="0" max="100" aria-label="Default" aria-describedby="inputGroup-sizing-=default" placeholder={transport} onChange={this.onChange}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Health</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="Health" type="number" min="0" max="100" aria-label="Default" aria-describedby="inputGroup-sizing-=default" placeholder={health} onChange={this.onChange}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Miscellaneous</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="Misc" type="number" min="0" max="100" aria-label="Default" aria-describedby="inputGroup-sizing-=default" placeholder={misc} onChange={this.onChange}/>
                        </InputGroup>
                    </Container>
                    {hasDashboard ? updateButton : createButton}
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state =>
({
    error: state.error,
    createdBudget: state.categories.createdBudget,
    hasDashboard: state.dashboard.hasDashboard,
    account: state.categories.account
});

export default connect(mapStateToProps, { updateCategories })(Categories);