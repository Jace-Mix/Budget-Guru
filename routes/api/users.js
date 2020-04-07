const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('config');

// User Model
const User = require('../../models/User');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('EMAIL'),
        pass: config.get('PASS')
    }
});

// Attempt to register user
router.post('/', (req, res) =>
{
    const {FirstName, LastName, Email, UserName, Password, PasswordConfirm} = req.body;

    if (!FirstName || !LastName || !Email || !UserName || !Password || !PasswordConfirm)
    {
        return res.status(400).json({error: "Please enter all fields"});
    }

    if (Password !== PasswordConfirm)
    {
        return res.status(400).json({error: "Passwords do not match"});
    }

    // Search for existing User
    User.findOne({ Email }).then(user => 
    {
        if (user)
        {
            return res.status(400).json({error: "Email already registered"});
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
                    // JWT sign
                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),
                        {expiresIn: 3600},
                        (err, token) =>
                        {
                            if (err) throw err;

                            var url;
                            if (process.env.NODE_ENV === "production")
                            {
                                url = `http://cop4331test.herokuapp.com/api/users/confirmation/${token}`;
                            }
                            else
                            {
                                url = `http://localhost:5000/api/users/confirmation/${token}`;
                            }

                            transporter.sendMail({
                                to: user.Email,
                                subject: 'Budget Guru Confirm Email',
                                html: `Please click this link to confirm your account: <a href="${url}">${url}</a>`
                            }, function(err) {
                                if (err) 
                                {
                                    console.log('Error in sending email');
                                }
                                else
                                {
                                    console.log('Email sent');
                                }
                            });

                            return res.json({ msg: "An email has been sent to your email address to confirm your account" });
                        }
                    )
                });
            })
        });
    });
});

router.get('/confirmation/:token', async (req, res) => 
{
    try
    {
        const decoded = jwt.verify(req.params.token, config.get('jwtSecret'));
        await User.findByIdAndUpdate(decoded.id, {Active: true});
    }
    catch (e)
    {
        res.redirect('http://localhost:3000/error');
    }

    return res.redirect('http://localhost:3000/confirmation');
});

module.exports = router;