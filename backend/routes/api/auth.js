const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

// User Model
const User = require('../../models/User');

router.post('/', (req, res) =>
{
    const {UserName, Password} = req.body;

    if (!UserName || !Password)
    {
        console.log(UserName);
        return res.status(400).json({error: "Please enter all fields"});
    }

    // Search for existing User
    User.findOne({ UserName }).then(user => 
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
                return res.status(400).json({error: "Username/Password is incorrect"});
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
                            FirstName: user.FirstName,
                            LastName: user.LastName,
                            Email: user.Email
                        }
                    })
                }
            )
        })
    });
});

router.get('/user', auth, (req, res) =>
{
    User.findById(req.user.id).select('-Password').then(user => res.json(user));
});

module.exports = router;