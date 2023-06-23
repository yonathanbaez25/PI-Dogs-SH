const { Dog } = require("../db");

const postDog = async (req, res) => {
  const { image, name, height, weight, years_of_live } = req.body;
  try {
    const newDog = await Dog.findOrCreate({
      where: { image, name, height, weight, years_of_live },
    });

    return res.status(200).json(newDog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postDog;
