const crypto = require('crypto');
const db = require('../migrations/index');

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
module.exports = {
    adminService: {
        adminUserSignUp,
    },
};
