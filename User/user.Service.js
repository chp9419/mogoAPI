const db = require("../migrations/index");

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

const userBikeInfoInsert = async (_name, _phone, _age, _bikeName) => {
  try {
    const name = _name;
    const phone = _phone;
    const age = _age;
    const bikeName = _bikeName;

    const T = await conn.transaction();

    const [result] = await db.BikeInfo.findAll({
      attributes: ["id"],
      where: { bikeName: bikeName },
    });
    const id = result.dataValues.id;
    await db.User.create({
      name: name,
      phone: phone,
      age: age,
      bikeName: bikeName,
      bike_id: id, // FK
    });
    await T.commit();
    return true;
  } catch (e) {
     await T.rollback();
    console.log(e.message);
    return 
  }
};

const sequelizeUpdateSQL = async () => {
  // SQL 문법을 활용한 UPDATE
  const conn = await db.sequelize;
  const T = await conn.transaction();
  try {
    await conn.query(`UPDATE users SET age =${110}`);
    T.commit();
  } catch (e) {
    T.rollback();
    console.log("롤백중");
    console.log(e.message);
  }
};
module.exports = {
  userService: {
    userInfoRead,
    userBikeInfoInsert,
  },
};
