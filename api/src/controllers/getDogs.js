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

    const dogsApi = data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        life_span: dog.life_span,
        temperament: dog.temperament,
        minWeight: dog.weight.metric.slice(0, 2).replace(" ", ""),
        maxWeight: dog.weight.metric.slice(4).replace(" ", ""),
        minHeight: dog.height.metric.slice(0, 2).replace(" ", ""),
        maxHeight: dog.height.metric.slice(4).replace(" ", ""),
        image: dog.image.url,
      };
    });

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
          const {
            id,
            image,
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            life_span,
            temperaments,
            dataBaseDog,
          } = dog;
          const temperament = temperaments.map((temp) => temp.name);

          return {
            id,
            image,
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            life_span,
            temperament,
            dataBaseDog,
          };
        });
        const dbDogs = [];

        dbDogs.push(...dogsDBn);
        return res.status(200).json(dbDogs);
      }

      for (let i = 0; i < data.length; i++) {
        if (dogsApi[i].name.toLowerCase().includes(name.toLowerCase())) {
          dogs.push(dogsApi[i]);
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
        const {
          id,
          image,
          name,
          minHeight,
          maxHeight,
          minWeight,
          maxWeight,
          life_span,
          temperaments,
          dataBaseDog,
        } = dog;
        const temperamentss = temperaments.map((temp) => temp.name);

        return {
          id,
          image,
          name,
          minHeight,
          maxHeight,
          minWeight,
          maxWeight,
          life_span,
          temperamentss,
          dataBaseDog,
        };
      });
      const dbDogs = [];

      dbDogs.push(...dogsDBn);

      const allDogs = [...dogsApi].concat(dbDogs);
      res.status(200).json(allDogs);
    }
  } catch (error) {
    return res.json({ err: error.message });
  }
};

const getDogsByID = async (req, res) => {
  try {
  } catch (error) {}
  try {
    const { id } = req.params;

    const { data } = await axios.get(`${URL}?api_key=${YOUR_API_KEY}`);

    const dogsApi = data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        life_span: dog.life_span,
        temperament: dog.temperament,
        minWeight: dog.weight.metric.slice(0, 2).replace(" ", ""),
        maxWeight: dog.weight.metric.slice(4).replace(" ", ""),
        minHeight: dog.height.metric.slice(0, 2).replace(" ", ""),
        maxHeight: dog.height.metric.slice(4).replace(" ", ""),
        image: dog.image.url,
      };
    });

    if (Number(id) <= 264) {
      const dog = dogsApi.find((element) => element.id === Number(id));
      if (dog) {
        console.log(dog);
        return res.status(200).json(dog);
      }
    } else {
      const dogDB = await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      if (dogDB) {
        const {
          id,
          image,
          name,
          minHeight,
          maxHeight,
          minWeight,
          maxWeight,
          life_span,
          temperaments,
          dataBaseDog,
        } = dogDB;
        const temperament = temperaments.map((temp) => temp.name);

        const dog = {
          id,
          image,
          name,
          minHeight,
          maxHeight,
          minWeight,
          maxWeight,
          life_span,
          temperament,
          dataBaseDog,
        };

        return res.status(200).json(dog);
      }
    }
  } catch (error) {
    return res.json({ err: error.message });
  }
};

module.exports = {
  getDogs,
  getDogsByID,
};
