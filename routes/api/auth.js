const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const nodemailer = require('nodemailer');
const config = require('config');

// Models
const User = require('../../models/User');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('EMAIL'),
        pass: config.get('PASS')
    }
});

// Login
router.post('/', (req, res) =>
{
    const {UserName, Password} = req.body;

    if (!UserName || !Password)
    {
        return res.status(400).json({error: "Please enter all fields"});
    }

    // Search for existing User
    User.findOne({ UserName }).then(user => 
    {
        if (!user)
        {
            return res.status(400).json({error: "User does not exist"});
        }
        if (!user.Active)
        {
            return res.status(400).json({error: "Please confirm your email to login"});
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
                    return res.json(
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

// Load User in App.js
router.get('/user', auth, (req, res) =>
{
    User.findById(req.user.id).select('-Password').then(user => res.json(user));
});

// Send password reset link
router.post('/resetLink', (req, res) =>
{
    const { Email } = req.body;

    if (!Email)
    {
        return res.status(400).json({error: "Please enter your email into the field"});
    }

    User.findOne({ Email }).then(user =>
    {
        if (!user)
        {
            return res.status(400).json({error: "Email not recognized"});
        }
        if (!user.Active)
        {
            return res.status(400).json({error: "This email is not active. Try checking your email for an activation link"})
        }

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
                    url = `http://cop4331test.herokuapp.com/api/auth/reset/${token}`;
                }
                else
                {
                    url = `http://localhost:5000/api/auth/reset/${token}`;
                }

                transporter.sendMail({
                    to:user.Email,
                    subject: 'Budget Guru Password Reset',
                    html: `Click this link to reset your password: ${url}`
                }), function(err) {
                    if (err)
                    {
                        console.log('Error in sending reset email');
                    }
                    else
                    {
                        console.log('Reset email sent');
                    }
                }

                return res.json({ msg: "An email has been sent to your email address to reset your password" });
            }
        )

    });
});

// password reset confirmation link
router.get('/reset/:token', async (req, res) =>
{
    try
    {
        const decoded = jwt.verify(req.params.token, config.get('jwtSecret'));
        console.log(decoded);
        await User.findByIdAndUpdate(decoded.id, { RequestPasswordChange: true });
    }
    catch (e)
    {
        if (process.env.NODE_ENV === "production")
        {
            return res.redirect('https://cop4331test.herokuapp.com/error');
        }
        else
        {
            return res.redirect('http://localhost:3000/error');
        }
    }

    if (process.env.NODE_ENV === "production")
    {
        return res.redirect('https://cop4331test.herokuapp.com/reset');
    }
    else
    {
        return res.redirect('http://localhost:3000/reset');
    }
});

// reset password
router.post('/reset', (req, res) =>
{
    const {Email, Password, PasswordConfirm} = req.body;

    if (!Email || !Password || !PasswordConfirm)
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
        if (!user)
        {
            return res.status(400).json({error: "Email not recognized"});
        }
        if (!user.Active)
        {
            return res.status(400).json({error: "Please confirm your email to login"});
        }
        if (!user.RequestPasswordChange)
        {
            return res.status(400).json({error: "This account did not request a password change"});
        }

        bcrypt.genSalt(10, (err, salt) =>
        {
            bcrypt.hash(Password, salt, (err, hash) =>
            {
                if (err) throw err;

                User.findOneAndUpdate({Email}, {Password: hash, RequestPasswordChange: false}).then(complete =>
                {
                    return res.json({ msg: "Your password has been successfully updated" });
                }).catch(err =>
                {
                    return res.status(400).json({error: "Error updating password"});
                })
            })
        });
    })
});

module.exports = router;