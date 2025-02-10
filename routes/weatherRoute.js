const express = require("express");
const router = express.Router();
const accessTokenMiddleware = require("../middleware/accessTokenMiddleware");
const { getWeatherByCity } = require("../controllers/weatherController");

router.get("/", accessTokenMiddleware, getWeatherByCity);

module.exports = router;
