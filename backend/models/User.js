const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    UserName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

// First argument is empty to prevent 'model()' from searching the database
module.exports = User = mongoose.model('', UserSchema, 'Users');