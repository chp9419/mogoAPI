const { adminService } = require('./admin.Service');

const adminSiginUp = async (req, res) => {
    const { id, pw } = req.body;
    try {
        const result = await adminService.adminUserSignUp(id, pw);

        if (result) {
            return res.status(200).json({ success: result });
        } else {
            return res.status(400).json({ success: result });
        }
    } catch (e) {
        res.status(500).json({ message: e });
    }
};

const adminLogin = async (req, res) => {
    const { id, pw } = req.body;
    try {
        const result = await adminService.adminLogin(id, pw);
        if (result.status === true) {
            return (
                res.cookie('token', result.token, {
                    httpOnly: true,
                    maxAge: 3600000,
                }),
                res.status(200).json({ result: result })
            );
        } else {
            return res.status(503).json({ result: result });
        }
    } catch (e) {
        return res.status(503).json({ result: e.message });
    }
};

module.exports = {
    controller: {
        adminSiginUp,
        adminLogin,
    },
};
