const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    AccountFK: {
        type: String,
        required: true
    },
    PercentCategory: {
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
    }
});

module.exports = Category = mongoose.model('Categories', CategoriesSchema, 'Categories');