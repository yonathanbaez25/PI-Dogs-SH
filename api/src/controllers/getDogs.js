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
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      if (dog.length !== 0) {
        const dogsDBn = dog.map((dog) => {
          const { id, image, name, height, weight, life_span, temperaments } =
            dog;
          const temperament = temperaments.map((temp) => temp.name);

          return {
            id,
            image,
            name,
            height,
            weight,
            life_span,
            temperament,
          };
        });
        const dbDogs = [];

        dbDogs.push(...dogsDBn);
        return res.status(200).json(dbDogs);
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(name.toLowerCase())) {
          dogs.push(data[i]);
        }
      }
      return res.status(200).json(dogs);
    } else {
      const dogDB = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      const dogsDBn = dogDB.map((dog) => {
        const { id, image, name, height, weight, life_span, temperaments } =
          dog;
        const temperament = temperaments.map((temp) => temp.name);

        return {
          id,
          image,
          name,
          height,
          weight,
          life_span,
          temperament,
        };
      });
      const dbDogs = [];

      dbDogs.push(...dogsDBn);

      const allDogs = [...data].concat(dbDogs);
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
      const dogDB1 = await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const dogDB = [];

      dogDB.push(dogDB1);

      console.log(dogDB);

      const dogsDBn = dogDB.map((dog) => {
        const { id, image, name, height, weight, life_span, temperaments } =
          dog;
        const temperament = temperaments.map((temp) => temp.name);

        return {
          id,
          image,
          name,
          height,
          weight,
          life_span,
          temperament,
        };
      });
      const dbDogs = [];

      dbDogs.push(...dogsDBn);

      if (dbDogs) {
        return res.status(200).json(dbDogs);
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
