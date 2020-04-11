const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Account = require('../../models/Account');
const Categories = require('../../models/Categories');

router.post('/update', [auth, 
    check('MonthlyIncome').isNumeric(),
    check('MonthlyBill').isNumeric(),
    check('Clothing').isNumeric(),
    check('FoodDrink').isNumeric(),
    check('Home').isNumeric(),
    check('Entertainment').isNumeric(),
    check('Transportation').isNumeric(),
    check('Health').isNumeric(),
    check('Misc').isNumeric()], (req, res) =>
{
    const errors = validationResult(req);
    const { MonthlyIncome, MonthlyBill, Clothing, FoodDrink, Home, Entertainment, Transportation, Health, Misc } = req.body;

    // Non-integer inputs
    if (!errors.isEmpty())
    {
        return res.status(400).json({error: "All fields must be numbers"});
    }

    // Emtpy Fields

    // Monthly bill can't be larger than Monthly income
    if (MonthlyIncome - MonthlyBill <= 0)
    {
        return res.status(400).json({error: "The following Income and Bill do not produce a budget"});
    }

    // No negative numbers
    if (Clothing < 0 || FoodDrink < 0 || Home < 0 || Entertainment < 0 || Transportation < 0 || Health < 0 || Misc < 0)
    {
        return res.status(400).json({error: "The category fields cannot have a negative percentage"});
    }

    // Needs to be 100%
    var sum = parseInt(Clothing) + parseInt(FoodDrink) + parseInt(Home) + parseInt(Entertainment) + parseInt(Transportation) + parseInt(Health) + parseInt(Misc);
    if (sum !== 100)
    {
        return res.status(400).json({error: "The categories do not add to 100%"});
    }

    // Update Budget
    Account.findOneAndUpdate({ AccountUser: req.user.id }, { MonthlyIncome, MonthlyBill, Active: true }, {new: true}).then(account =>
    {
        // Update Categories
        Categories.findOneAndUpdate({ AccountFK: account.id }, {'$set': {
            'Category.Clothing': Clothing,
            'Category.FoodDrink': FoodDrink,
            'Category.Home': Home,
            'Category.Entertainment': Entertainment,
            'Category.Transportation': Transportation,
            'Category.Health': Health,
            'Category.Misc': Misc
        }}).then(categoryCallback =>
        {
            if (!categoryCallback)
            {
                return res.status(400).json({ error: "Error: Could not update categories" })
            }
        });
        if (!account)
        {
            return res.status(400).json({ error: "Error: Could not update budget" });
        }
        res.json({
            account:
            {
                Active: account.Active,
                MonthlyIncome: account.MonthlyIncome,
                MonthlyBill: account.MonthlyBill,
            }
        })
    })
});

router.get('/getCategories', auth, (req, res) =>
{
    Account.findOne({AccountUser: req.user.id}).select('MonthlyIncome MonthlyBill Active').then(account=> {
        Categories.findOne({AccountFK: account.id}).select('Category').then(categories => {
            const deliverable = {
                Active: account.Active,
                MonthlyIncome: account.MonthlyIncome,
                MonthlyBill: account.MonthlyBill,
                Category: categories.Category
            };
            res.json(deliverable);
        });
    })
});

module.exports = router;