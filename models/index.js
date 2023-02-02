'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const  User = require('../models/User');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);
db.sequelize = sequelize;

db.User = User;
User.init(sequelize);

module.exports = db;
