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
module.exports = {
    controller: {
        productCheck,
        memberCheckList,
    },
};
