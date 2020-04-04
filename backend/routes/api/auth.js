const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

router.post('/', (req, res) =>
{
    const {Email, Password} = req.body;

    if (!Email || !Password)
    {
        return res.status(400).json({error: "Please enter all fields"});
    }

    // Search for existing User
    User.findOne({ Email }).then(user => 
    {
        if (!user)
        {
            return res.status(400).json({error: "User does not exist"});
        }

        // Validate password
        bcrypt.compare(Password, user.Password).then(isMatch =>
        {
            if(!isMatch)
            {
                return res.status(400).json({error: "Invalid credentials"});
            }

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
        })
    });
});

module.exports = router;