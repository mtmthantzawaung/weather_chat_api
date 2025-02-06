const axios = require("axios");

exports.getWeather = async (city) => {
  const API_KEY = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const response = await axios.get(url);
  return response.data;
};
