const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');


module.exports = function (req, res, next) {
    try {
        let token = req.cookies.token;

        if (token) {
            req.user = jwt.verify(token, secret);
        } else {
            req.user = {user_id: null, role: 'Гость'};
        }

        next();
    } catch (e) {
        req.user = {user_id: null, role: 'Гость'};
        next();
    }
}