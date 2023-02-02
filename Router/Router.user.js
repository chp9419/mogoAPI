const express =require('express');
const userRotuer = express.Router();

const {controller} =require('../User/user.controller');



userRotuer.get('/:name',controller.userGetInfo);


module.exports = userRotuer;
