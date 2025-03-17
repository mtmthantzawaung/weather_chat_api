const axios = require("axios");

exports.getWeather = async (city) => {
  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    console.log('response',response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch weather data" };
  }
};

exports.getHourlyWeather = async (lat, long) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?current=&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&latitude=${lat}&longitude=${long}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to fetch hourly weather data" }
    );
  }
};
