const axios = require("axios");

const URL = "https://api.thedogapi.com/v1/breeds";
const { YOUR_API_KEY } = process.env;

const getDogs = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds/search?q=${name}`
      );
      res.json(data);
    } else {
      const { data } = await axios.get(`${URL}?api_key=${YOUR_API_KEY}`);
      res.status(200).json(data);
    }
  } catch (error) {
    res.json({ err: error.message });
  }
};

const getDogsByID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { data } = await axios.get(`${URL}/${id}?api_key=${YOUR_API_KEY}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDogs,
  getDogsByID,
};
