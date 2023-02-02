const express =require('express');
const userRotuer = express.Router();

const {controller} =require('../User/user.controller');



userRotuer.get('/:name',controller.userGetInfo);
userRotuer.post('/memberSign',controller.userInfoBikeInsert);

module.exports = userRotuer;
