const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
const { YOUR_API_KEY } = process.env;
const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  const { data } = await axios.get(`${URL}?api_key=${YOUR_API_KEY}`);

  let temperament = [];
  try {
    const allTemperaments = Array.from(
      data.reduce((temperaments, data) => {
        if (data.temperament) {
          const dataTemperaments = data.temperament
            .split(",")
            .map((t) => t.trim());
          dataTemperaments.forEach((temperament) =>
            temperaments.add(temperament)
          );
        }
        return temperaments;
      }, new Set())
    );

    for (let i = 0; i < allTemperaments.length; i++) {
      const temp = { name: allTemperaments[i] };
      temperament.push(temp);
    }

    const sendAllTemperaments = await Temperament.bulkCreate(temperament);
    res.status(200).json(sendAllTemperaments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getTemperaments;
