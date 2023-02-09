const crypto = require('crypto');
const db = require('../migrations/index');
const { token } = require('../module/jwt');

const adminUserSignUp = async (userId, password) => {
    const id = userId;
    const pw = password;

    const conn = await db.sequelize;
    const T = await conn.transaction();
    try {
        const salt = crypto.randomBytes(64).toString('base64');
        const hash = crypto
            .pbkdf2Sync(pw, salt, 10000, 64, 'sha512')
            .toString('hex');
        await db.adminUser.create({ admin: id, salt, hash });
        T.commit();
        return true;
    } catch (e) {
        T.rollback();
        return false;
    }
};

const adminLogin = async (userId, password) => {
    const id = userId;
    const pw = password;

    try {
        const [result] = await db.adminUser.findAll({
            attributes: ['admin', 'salt', 'hash'],
            where: { admin: id },
        });

        const hash = crypto
            .pbkdf2Sync(pw, result.dataValues.salt, 10000, 64, 'sha512')
            .toString('hex');

        if (hash === result.dataValues.hash) {
            const x = token(id).then((token) => {
                return {
                    id: id,
                    token: token,
                    message: 'Success Login',
                    status: true,
                };
            });
            return x;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
    //crypto.pbkdf2Sync
};
module.exports = {
    adminService: {
        adminUserSignUp,
        adminLogin,
    },
};
