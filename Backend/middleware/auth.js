
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (roles = []) => {
    return async (req, res, next) => {
 
        if (typeof roles === 'string') {
            roles = [roles];
        }

        const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.user.id);
            if (roles.length && !roles.includes(req.user.role)) {
   
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = auth;
