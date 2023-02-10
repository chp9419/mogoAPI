const express = require('express');
const userRotuer = express.Router();

const { controller } = require('./user.controller');

userRotuer.get('/:name', controller.userGetInfo);
userRotuer.post('/bike', controller.userInfoBikeInsert);

module.exports = userRotuer;
