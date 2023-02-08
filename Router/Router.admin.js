const express =require('express');
const adminRouter = express.Router();

const {controller} =require('../Admin/admin.controller');


adminRouter.post('/admin',controller.adminSiginUp);



module.exports = adminRouter;
