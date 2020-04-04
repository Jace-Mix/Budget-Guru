const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose
    .connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Listening on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));