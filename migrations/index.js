const Sequelize = require('sequelize');
const config = require('../config/config.json');
const User = require('./User');
const BikeInfo = require('./bikeInfo');
const adminUser = require('./admin');
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
db.sequelize = sequelize;
db.Sequelize = sequelize;

// 테이블 셋팅
db.User = User;
User.init(sequelize);

db.BikeInfo = BikeInfo;
BikeInfo.init(sequelize);
BikeInfo.associate(db);

db.adminUser = adminUser;
adminUser.init(sequelize);
adminUser.associate(db);

module.exports = db;
