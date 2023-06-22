const { User } = require("../db");

const getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });

    res.json(user);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports = getUser;
