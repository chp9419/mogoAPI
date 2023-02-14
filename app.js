require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const path = require('path');
const auth = require('./module/jwt');

const { sequelize } = require('./migrations'); // db.sequelize
const app = express();

const userRoutuer = require('./User/Router.user');
const adminRouter = require('./Admin/Router.admin');
const productRouter = require('./Product/Rotuer.product');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/regist', auth.cert, userRoutuer);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.set('port', process.env.PORT || 3000);
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결됨.');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

// 현재 테스트 중입니다. 확인용 입니다.
