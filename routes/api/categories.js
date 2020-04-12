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
    Account.findOne({ AccountUser: req.user.id }).then(account =>
    {
        if (!account)
        {
            return res.status(400).json({ error: "Error: Could not update budget" });
        }

        // Update Categories
        Categories.findOne({ AccountFK: account.id }).then(categoryCallback =>
        {
            if (!categoryCallback)
            {
                return res.status(400).json({ error: "Error: Could not update categories" })
            }

            var budget = parseInt(MonthlyIncome) - parseInt(MonthlyBill) + parseInt(account.Earned) - parseInt(account.Spent);
            account.Budget = budget;
            account.CalculatedCategory.Clothing = budget * (parseInt(Clothing).toFixed(2) / 100);
            account.CalculatedCategory.FoodDrink = budget * (parseInt(FoodDrink).toFixed(2) / 100);
            account.CalculatedCategory.Home = budget * (parseInt(Home).toFixed(2) / 100);
            account.CalculatedCategory.Entertainment = budget * (parseInt(Entertainment).toFixed(2) / 100);
            account.CalculatedCategory.Transportation = budget * (parseInt(Transportation).toFixed(2) / 100);
            account.CalculatedCategory.Health = budget * (parseInt(Health).toFixed(2) / 100);
            account.CalculatedCategory.Misc = budget * (parseInt(Misc).toFixed(2) / 100);
            account.MonthlyIncome = MonthlyIncome;
            account.MonthlyBill = MonthlyBill;
            account.Active = true;

            categoryCallback.PercentCategory.Clothing = Clothing;
            categoryCallback.PercentCategory.FoodDrink = FoodDrink;
            categoryCallback.PercentCategory.Home = Home;
            categoryCallback.PercentCategory.Entertainment = Entertainment;
            categoryCallback.PercentCategory.Transportation = Transportation;
            categoryCallback.PercentCategory.Health = Health;
            categoryCallback.PercentCategory.Misc = Misc;
            
            categoryCallback.save().then(cat =>
            {
                account.save().then(acc => 
                {
                    res.json({
                        Active: acc.Active,
                        MonthlyIncome: acc.MonthlyIncome,
                        MonthlyBill: acc.MonthlyBill,
                        Budget: acc.Budget,
                        Earned: acc.Earned,
                        Spent: acc.Spent,
                        CalculatedCategory: acc.CalculatedCategory,
                        PercentCategory: cat.PercentCategory
                    })
                })
            })
        })
    })
});

router.get('/getCategories', auth, (req, res) =>
{
    Account.findOne({AccountUser: req.user.id}).select('-AccountUser').then(account=> {
        Categories.findOne({AccountFK: account.id}).select('PercentCategory').then(categories => {
            const deliverable = {
                Active: account.Active,
                Budget: account.Budget,
                Earned: account.Earned,
                Spent: account.Spent,
                MonthlyIncome: account.MonthlyIncome,
                MonthlyBill: account.MonthlyBill,
                CalculatedCategory: account.CalculatedCategory,
                PercentCategory: categories.PercentCategory
            };
            res.json(deliverable);
        });
    })
});

module.exports = router;