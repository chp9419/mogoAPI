const db = require('../migrations/index');

const userInfoRead = async (name) => {
    try {
        const _name = name;
        const [result] = await db.User.findAll({
            attributes: ['name', 'age'],
            where: { name: _name },
        });
        const data = result.dataValues;

        const info = {
            name: data.name,
            age: data.age,
            married: data.married,
        };
        return info;
    } catch (e) {
        console.log(e);
    }
};

const userBikeInfoInsert = async (_name, _phone, _age, _bikeName) => {
    const conn = await db.sequelize;
    const T = await conn.transaction();

    try {
        const name = _name;
        const phone = _phone;
        const age = _age;
        const bikeName = _bikeName;

        const [result] = await db.BikeInfo.findAll({
            attributes: ['id', 'count'],
            where: { bikeName: bikeName },
        });
        const id = result.dataValues.id; // 유니크 인덱스
        const count = result.dataValues.count; // 재고 숫자.
        const countNumber = count - 1;

        await db.User.create({
            name,
            phone,
            age,
            bikeName,
            bike_id: id, // FK
        });
        await db.BikeInfo.update({ count: countNumber }, { where: { id: id } });
        await T.commit();
        return true;
    } catch (e) {
        await T.rollback();
        console.log(e.message);
        return false;
    }
};

// const sequelizeUpdateSQL = async () => {
//   // SQL 문법을 활용한 UPDATE
//   const conn = await db.sequelize
//   const T = await conn.transaction()
//   try {
//     await conn.query(`UPDATE users SET age =${110}`)
//     T.commit()
//   } catch (e) {
//     T.rollback()
//     console.log('롤백중')
//     console.log(e.message)
//   }
// }
module.exports = {
    userService: {
        userInfoRead,
        userBikeInfoInsert,
    },
};
