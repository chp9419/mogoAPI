const express = require('express');
const userRotuer = express.Router();

const { controller } = require('../User/user.controller');

userRotuer.get('/:name', controller.userGetInfo);
userRotuer.post('/regist/bike', controller.userInfoBikeInsert);

module.exports = userRotuer;
