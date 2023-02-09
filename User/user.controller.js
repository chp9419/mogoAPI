const { userService } = require('../User/user.Service');

const userGetInfo = async (req, res) => {
    const { name } = req.params;

    try {
        const data = await userService.userInfoRead(name);
        return res.status(200).json(data);
    } catch (e) {
        res.status(400).json({ success: false });
    }
};

const userInfoBikeInsert = async (req, res) => {
    const { name, phone, age, bikeName } = req.body;
    try {
        const data = await userService.userBikeInfoInsert(
            name,
            phone,
            age,
            bikeName
        );
        if (data == true) {
            return res.status(200).json({ result: data });
        } else {
            return res.status(503).json({ result: data });
        }
    } catch (e) {
        return res.status(500).json({ result: e.message });
    }
};

module.exports = {
    controller: {
        userGetInfo,
        userInfoBikeInsert,
    },
};
