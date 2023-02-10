const db = require('../migrations/index');

// ## 회원 구매 목록 조회
const productListCheck = async () => {
    const conn = await db.sequelize;

    try {
        const [data] =
            await conn.query(`SELECT UR.name,UR.age,UR.phone,BI.bikeName,BI.bikeSize,BI.amount 
    FROM users UR 
    LEFT JOIN BikeInfo BI ON BI.id = UR.bike_id`);
        const result = data.map((item) => {
            const prdList = {
                name: item['name'],
                age: item['age'],
                phone: item['phone'],
                bikeName: item['bikeName'],
                bikeSize: item['bikeSize'],
                amount: item['amount'],
            };

            return prdList;
        });
        return result;
    } catch (e) {
        console.log(e.message);
        return false;
    }
};

const productInsert = async (name, brand, size, amount, count) => {
    const bikeName = name;
    const bikeBrand = brand;
    const frameSize = size;
    const _amount = amount;
    const _count = count;
    const conn = await db.sequelize;
    const T = await conn.transaction();

    try {
        await db.BikeInfo.create({
            bikeName: bikeName,
            brandName: bikeBrand,
            bikeSize: frameSize,
            count: _count,
            amount: _amount,
        });
        T.commit();
        return true;
    } catch (e) {
        T.rollback();
        return false;
    }
};

// 특정 회원 구매 목록 조회
const memberPurchaseList = async (input, startDate, endDate) => {
    const conn = await db.sequelize;
    const phoneNumber = input;

    let check;
    let column;
    if (phoneNumber) {
        check = phoneNumber;
        column = 'UR.phone';
    }
    try {
        const [data] =
            await conn.query(`SELECT UR.name,UR.age,UR.phone,BI.bikeName,BI.bikeSize,BI.amount,UR.created_at
        FROM users UR 
        LEFT JOIN BikeInfo BI ON BI.id = UR.bike_id 
        WHERE DATE(UR.created_at) BETWEEN ${startDate} AND ${endDate} AND ${column} LIKE "%${check}%"`);

        return data;
    } catch (e) {
        console.log(e.message);
        return false;
    }
};

module.exports = {
    productService: {
        productListCheck,
        memberPurchaseList,
        productInsert,
    },
};
