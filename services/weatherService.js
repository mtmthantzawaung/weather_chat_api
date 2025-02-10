const axios = require("axios");

exports.getWeather = async (city) => {
  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch weather data" };
  }
};
