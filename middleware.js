const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config();

// Middleware to authenticate cookie
const authenticateCookie = (req, res, next) => {
    // Extracting cookie from req.cookies
    const cookie = req.cookies.auth_cookie;

    if (!cookie) {
        return res.redirect("/login");
    }

    jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET, (err, decodedValue) => {
        if (err) {
            return res.redirect("/login");
        }
        // Creating a property called 'decodedData' in req object so that I can access the decoded cookie in index.js
        req.decodedData = decodedValue;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = {
    authenticateCookie,
};