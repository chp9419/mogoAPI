const User = require("../models/User");
const db = require("../models/index");

const userInfoRead = async (name) => {
  try {
    const _name = name;
    const [result] = await db.User.findAll({
      attributes: ["name", "age"],
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

const sequelizeUpdateSQL = async () => { // SQL 문법을 활용한 UPDATE
  const conn = await db.sequelize;
  const T = await conn.transaction();
  try {
    
    await conn.query(`UPDATE users SET age =${110}`);
    T.commit();

  } catch (e) {
    T.rollback();
    console.log('롤백중')
    console.log(e.message);
  } 
};
sequelizeUpdateSQL();
module.exports = {
  userService: {
    userInfoRead,
  },
};
