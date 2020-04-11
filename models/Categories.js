const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    AccountFK: {
        type: String,
        required: true
    },
    Category: {
        type: {
            "Clothing": Number,
            "FoodDrink": Number,
            "Home": Number,
            "Entertainment": Number,
            "Transportation": Number,
            "Health": Number,
            "Misc": Number
        },
        default: {
            "Clothing": 0,
            "FoodDrink": 0,
            "Home": 0,
            "Entertainment": 0,
            "Transportation": 0,
            "Health": 0,
            "Misc": 0
        }
    }
});

module.exports = Category = mongoose.model('Categories', CategoriesSchema, 'Categories');