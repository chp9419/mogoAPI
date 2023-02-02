const { userService } = require("../User/user.Service");

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
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

module.exports = {
  controller: {
    userGetInfo,
    userInfoBikeInsert,
  },
};
