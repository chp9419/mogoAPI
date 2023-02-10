const { controller } = require('./product.controller');
const express = require('express');
const productRouter = express.Router();

productRouter.get('check', controller.productCheck);
productRouter.get('/member', controller.memberCheckList);
productRouter.put('/insert/product', controller.productInsert);

module.exports = productRouter;
