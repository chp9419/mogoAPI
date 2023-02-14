const { productService } = require('./product.Service');

const productCheck = async (req, res) => {
    try {
        const data = await productService.productListCheck();

        return res.status(200).json({ reuslt: data });
    } catch (e) {
        return res.status(503).json({ reuslt: false });
    }
};

const memberCheckList = async (req, res) => {
    const { phone, startDate, endDate } = req.query;

    try {
        const data = await productService.memberPurchaseList(
            phone,
            startDate,
            endDate
        );
        return res.status(200).json({ result: data });
    } catch (e) {
        return res.status(503).json({ result: false });
    }
};

const productInsert = async (req, res) => {
    const { bikeName, brand, size, amount, count } = req.body;
    try {
        const data = await productService.productInsert(
            bikeName,
            brand,
            size,
            amount,
            count
        );
        if (data) {
            return res.status(201).json({ result: data });
        } else {
            return res.status(503).json({ result: data });
        }
    } catch (e) {
        return res.status(503).json({ result: false });
    }
};

const countPlus = async (req, res) => {
    // 수량만 추가 및 삭제 하고 싶을때
    const { id, count } = req.query;

    try {
    } catch (e) {
        return res.status(503).json({ result: false });
    }
};

const countDelete = async (req, res) => {
    const { id, count } = req.query;

    try {
    } catch (e) {
        return res.status(503).json({ result: false });
    }
};
module.exports = {
    controller: {
        productCheck,
        memberCheckList,
        productInsert,
    },
};
