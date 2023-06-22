const { User } = require("../db");

const postUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOrCreate({ where: { email, password } });
    res.json(user);
  } catch (error) {}
};

module.exports = postUser;
