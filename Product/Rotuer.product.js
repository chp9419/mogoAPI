const { controller } = require('./product.controller');
const express = require('express');
const productRouter = express.Router();

productRouter.get('/product', controller.productCheck);
productRouter.get('/member', controller.memberCheckList);

module.exports = productRouter;
