'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const  User = require('../models/User');
const BikeInfo = require('../models/bikeInfo');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);
db.sequelize = sequelize;
db.Sequelize = sequelize;

// 테이블 셋팅
db.User = User;
User.init(sequelize);

db.BikeInfo = BikeInfo;
BikeInfo.init(sequelize);

//User.associate(db);
BikeInfo.associate(db);

module.exports = db;
