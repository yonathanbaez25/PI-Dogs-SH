const axios = require("axios");

const URL = "https://api.thedogapi.com/v1/breeds";
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");

const getDogs = async (req, res) => {
  const { name } = req.query;
  let dogs = [];

  try {
    const { data } = await axios.get(`${URL}?api_key=${YOUR_API_KEY}`);

    if (name) {
      const dog = await Dog.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: Temperament,
      });
      if (dog.length !== 0) {
        return res.status(200).json(dog);
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(name.toLowerCase())) {
          dogs.push(data[i]);
        }
      }
      return res.status(200).json(dogs);
    } else {
      const dogDB = await Dog.findAll({
        include: [
          {
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      const allDogs = [...data].concat(dogDB);
      res.status(200).json(allDogs);
    }
  } catch (error) {
    return res.json({ err: error.message });
  }
};

const getDogsByID = async (req, res) => {
  const { id } = req.params;

  const { data } = await axios.get(`${URL}?api_key=${YOUR_API_KEY}`);
  try {
    if (Number(id) <= 264) {
      const dog = data.find((element) => element.id === Number(id));
      if (dog) {
        return res.status(200).json(dog);
      }
    } else {
      const dogDB = await Dog.findByPk(id);
      if (dogDB) {
        return res.status(200).json(dogDB);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDogs,
  getDogsByID,
};
