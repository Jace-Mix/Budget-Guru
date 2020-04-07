const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Express setup
const app = express();
app.use(express.json());

// Database connection
const db = process.env.mongoURI;
mongoose
    .connect(db, {useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// API calls
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));


if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) =>
    {
        res.sendFild(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}


// Listening on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));