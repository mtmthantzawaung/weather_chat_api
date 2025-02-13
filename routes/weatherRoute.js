const express = require("express");
const router = express.Router();
const accessTokenMiddleware = require("../middleware/accessTokenMiddleware");
const { getWeatherByCity, getHourlyWeatherByCity } = require("../controllers/weatherController");

router.get("/", accessTokenMiddleware, getWeatherByCity);

router.get("/hourly", accessTokenMiddleware, getHourlyWeatherByCity);

module.exports = router;
