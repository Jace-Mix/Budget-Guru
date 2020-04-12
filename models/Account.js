const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    MonthlyIncome: {
        type: Number,
        default: 0
    },
    MonthlyBill: {
        type: Number,
        default: 0
    },
    Budget: {
        type: Number,
        default: 0
    },
    Earned: {
        type: Number,
        default: 0
    },
    Spent: {
        type: Number,
        default: 0
    },
    CalculatedCategory: {
        Clothing: {
            type: Number,
            default: 0
        },
        FoodDrink: {
            type: Number,
            default: 0
        },
        Home: {
            type: Number,
            default: 0
        },
        Entertainment: {
            type: Number,
            default: 0
        },
        Transportation: {
            type: Number,
            default: 0
        },
        Health: {
            type: Number,
            default: 0
        },
        Misc: {
            type: Number,
            default: 0
        }
    },
    Active: {
        type: Boolean,
        default: false
    },
    AccountUser: {
        type: String,
        required: true
    }
});

module.exports = Account = mongoose.model('Account', AccountSchema, 'Account');