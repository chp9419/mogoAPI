require('dotenv').config();
const jwt = require('jsonwebtoken');
const { secret } = require('./key');

exports.token = (adminId) => {
    const result = new Promise((resolve, reject) => {
        jwt.sign(
            {
                id: adminId,
            },
            secret,
            {
                expiresIn: '1h',
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
    return result;
};

exports.cert = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in',
        });
    }
    const p = new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });
    const respond = (decode) => {
        next();
    };
    const onError = (e) => {
        res.status(403).json({
            success: false,
            message: e.message,
        });
    };

    p.then(respond).catch(onError);
};
