const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

router.post('/', (req, res) =>
{
    const {FirstName, LastName, Email, UserName, Password} = req.body;

    if (!FirstName || !LastName || !Email || !UserName || !Password)
    {
        return res.status(400).json({error: "Please enter all fields"});
    }

    // Search for existing User
    User.findOne({ Email }).then(user => 
    {
        if (user)
        {
            return res.status(400).json({error: "Email already Registered"});
        }

        const newUser = new User(
        {
            FirstName,
            LastName,
            Email,
            UserName,
            Password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => 
        {
            bcrypt.hash(newUser.Password, salt, (err, hash) => 
            {
                if (err) throw err;
                
                newUser.Password = hash;
                newUser.save().then(user => 
                {
                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),
                        {expiresIn: 3600},
                        (err, token) =>
                        {
                            if (err) throw err;
                            res.json(
                            {
                                token,
                                user: 
                                {
                                    id: user.id,
                                    firstName: user.FirstName,
                                    lastName: user.LastName,
                                    email: user.Email
                                }
                            })
                        }
                    )
                });
            })
        });
    });
});

module.exports = router;