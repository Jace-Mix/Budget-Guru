const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Account = require('../../models/Account');
const Categories = require('../../models/Categories');

router.post('/updateSpent', auth, (req, res) =>
{
    const { Spent, Category } = req.body;

    if (Spent === 0)
    {
        return res.status(400).json({error: 'Please fill out the field first'});
    }

    if (Category === '')
    {
        return res.status(400).json({error: 'Please select a category'});
    }

    Account.findOne({ AccountUser: req.user.id }).then(account =>
    {
        var newSpent = parseFloat(account.Spent) + parseFloat(Spent);
        var newBudget = parseFloat(account.Budget) - parseFloat(Spent);
        account.Budget = newBudget;
        account.Spent = newSpent;
        switch(Category)
        {
            case 'Clothing':
                {
                    account.CalculatedCategory.Clothing = account.CalculatedCategory.Clothing - parseFloat(Spent);
                    account.save();
                    return res.json({
                        msg: `Spent $${Spent} on ${Category}`,
                        account: {
                            Active: account.Active,
                            Budget: account.Budget,
                            Earned: account.Earned,
                            Spent: account.Spent,
                            MonthlyIncome: account.MonthlyIncome,
                            MonthlyBill: account.MonthlyBill,
                            CalculatedCategory: account.CalculatedCategory,
                        }
                    });
                }
            case 'FoodDrink':
                {
                    account.CalculatedCategory.FoodDrink = account.CalculatedCategory.FoodDrink - parseFloat(Spent);
                    account.save();
                    return res.json({
                        msg: `Spent $${Spent} on ${Category}`,
                        account: {
                            Active: account.Active,
                            Budget: account.Budget,
                            Earned: account.Earned,
                            Spent: account.Spent,
                            MonthlyIncome: account.MonthlyIncome,
                            MonthlyBill: account.MonthlyBill,
                            CalculatedCategory: account.CalculatedCategory,
                        }
                    });                    
                }
            case 'Home':
                {
                    account.CalculatedCategory.Home = account.CalculatedCategory.Home - parseFloat(Spent);
                    account.save();
                    return res.json({
                        msg: `Spent $${Spent} on ${Category}`,
                        account: {
                            Active: account.Active,
                            Budget: account.Budget,
                            Earned: account.Earned,
                            Spent: account.Spent,
                            MonthlyIncome: account.MonthlyIncome,
                            MonthlyBill: account.MonthlyBill,
                            CalculatedCategory: account.CalculatedCategory,
                        }
                    });
                }
            case 'Entertainment':
                {
                    account.CalculatedCategory.Entertainment = account.CalculatedCategory.Entertainment - parseFloat(Spent);
                    account.save();
                    return res.json({
                        msg: `Spent $${Spent} on ${Category}`,
                        account: {
                            Active: account.Active,
                            Budget: account.Budget,
                            Earned: account.Earned,
                            Spent: account.Spent,
                            MonthlyIncome: account.MonthlyIncome,
                            MonthlyBill: account.MonthlyBill,
                            CalculatedCategory: account.CalculatedCategory,
                        }
                    });
                }
            case 'Transportation':
                {
                    account.CalculatedCategory.Transportation =  account.CalculatedCategory.Transportation - parseFloat(Spent);
                    account.save();
                    return res.json({
                        msg: `Spent $${Spent} on ${Category}`,
                        account: {
                            Active: account.Active,
                            Budget: account.Budget,
                            Earned: account.Earned,
                            Spent: account.Spent,
                            MonthlyIncome: account.MonthlyIncome,
                            MonthlyBill: account.MonthlyBill,
                            CalculatedCategory: account.CalculatedCategory,
                        }
                    });
                }
            case 'Health':
                {
                    account.CalculatedCategory.Health = account.CalculatedCategory.Health - parseFloat(Spent);
                    account.save();
                    return res.json({
                        msg: `Spent $${Spent} on ${Category}`,
                        account: {
                            Active: account.Active,
                            Budget: account.Budget,
                            Earned: account.Earned,
                            Spent: account.Spent,
                            MonthlyIncome: account.MonthlyIncome,
                            MonthlyBill: account.MonthlyBill,
                            CalculatedCategory: account.CalculatedCategory,
                        }
                    });
                }
            case 'Misc':
                {
                    account.CalculatedCategory.Misc = account.CalculatedCategory.Misc - parseFloat(Spent);
                    account.save();
                    return res.json({
                        msg: `Spent $${Spent} on ${Category}`,
                        account: {
                            Active: account.Active,
                            Budget: account.Budget,
                            Earned: account.Earned,
                            Spent: account.Spent,
                            MonthlyIncome: account.MonthlyIncome,
                            MonthlyBill: account.MonthlyBill,
                            CalculatedCategory: account.CalculatedCategory,
                        }
                    });
                }
            default:
                {
                    return res.status(400).json({ error: 'Unable to locate category'});
                }
        }
    })
});

router.post('/updateEarned', auth, (req, res) =>
{
    const { Earned } = req.body;

    if (Earned === 0)
    {
        return res.status(400).json({error: 'Please fill out the field first'});
    }

    Account.findOne({ AccountUser: req.user.id }).then(account =>
    {
        Categories.findOne({ AccountFK: account.id }).then(cat =>
        {
            var budget = account.Budget + parseFloat(Earned);
            account.Budget = budget;
            account.CalculatedCategory.Clothing = budget * (parseInt(cat.PercentCategory.Clothing).toFixed(2) / 100);
            account.CalculatedCategory.FoodDrink = budget * (parseInt(cat.PercentCategory.FoodDrink).toFixed(2) / 100);
            account.CalculatedCategory.Home = budget * (parseInt(cat.PercentCategory.Home).toFixed(2) / 100);
            account.CalculatedCategory.Entertainment = budget * (parseInt(cat.PercentCategory.Entertainment).toFixed(2) / 100);
            account.CalculatedCategory.Transportation = budget * (parseInt(cat.PercentCategory.Transportation).toFixed(2) / 100);
            account.CalculatedCategory.Health = budget * (parseInt(cat.PercentCategory.Health).toFixed(2) / 100);
            account.CalculatedCategory.Misc = budget * (parseInt(cat.PercentCategory.Misc).toFixed(2) / 100);
            account.Earned = Earned;

            account.save().then(acc =>
            {
                res.json({
                    msg: `Earned $${Earned}`,
                    account: {
                        Active: acc.Active,
                        MonthlyIncome: acc.MonthlyIncome,
                        MonthlyBill: acc.MonthlyBill,
                        Budget: acc.Budget,
                        Earned: acc.Earned,
                        Spent: acc.Spent,
                        CalculatedCategory: acc.CalculatedCategory
                    }
                })
            });
        })
    })
});

module.exports = router;