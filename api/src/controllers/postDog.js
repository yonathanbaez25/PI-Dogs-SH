const { Dog, Temperament } = require("../db");

const postDog = async (req, res) => {
  try {
    const { image, name, height, weight, life_span, temperaments } = req.body;
    const newDog = await Dog.create({
      image,
      name,
      height,
      weight,
      life_span,
    });

    await newDog.addTemperament(temperaments);

    return res.status(200).json(newDog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postDog;
