const { successResponse, errorResponse } = require("../utils/responseUtils");
const { getWeather, getHourlyWeather } = require("../services/weatherService");

exports.getWeatherByCity = async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) return errorResponse(res, 400, "City is required.");

    const weatherData = await getWeather(city);
    return successResponse(
      res,
      200,
      "Weather data fetched successfully",
      weatherData
    );
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message);
  }
};

exports.getHourlyWeatherByCity = async (req, res) => {
  try {
    const lat = req.query.lat;
    const long = req.query.long;
    if (!lat && !long)
      return errorResponse(res, 400, "lat & long are required.");

    const weatherData = await getHourlyWeather(lat, long);
    return successResponse(
      res,
      200,
      "Hourly Weather data fetched successfully",
      weatherData
    );
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message);
  }
};
