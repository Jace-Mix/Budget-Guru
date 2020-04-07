require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('config');

// To be used for CRUD operations
function auth(req, res, next)
{
    const token = req.header('x-auth-token');

    // Check for token
    if (!token)
    {
        return res.status(401).json({error: "Unauthorized action"});
    }

    try
    {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = decoded;
        next();
    }
    catch(e)
    {
        res.status(400).json({error: "Invalid Token"});
    }
}

module.exports = auth;