const axios = require("axios");

const URL = "https://api.thedogapi.com/v1/breeds";
const { YOUR_API_KEY } = process.env;

const getDogs = async (req, res) => {
  const { name } = req.query;
  let dogs = [];

  try {
    const { data } = await axios.get(`${URL}?api_key=${YOUR_API_KEY}`);

    if (name) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(name.toLowerCase())) {
          dogs.push(data[i]);
        }
      }
      return res.status(200).json(dogs);
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.json({ err: error.message });
  }
};

const getDogsByID = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`${URL}?api_key=${YOUR_API_KEY}`);

    const dog = data.find((element) => element.id === Number(id));
    if (dog) {
      return res.status(200).json(dog);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDogs,
  getDogsByID,
};
