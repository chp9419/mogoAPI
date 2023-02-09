const express = require('express');
const adminRouter = express.Router();

const { controller } = require('../Admin/admin.controller');

adminRouter.post('/sign', controller.adminSiginUp);
adminRouter.post('/login', controller.adminLogin);

module.exports = adminRouter;
