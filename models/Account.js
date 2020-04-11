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