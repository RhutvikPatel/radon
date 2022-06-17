const express = require('express');
const router = express.Router();
const CowinController = require("../controllers/cowinController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get("/cowin/getByDistrictId", CowinController.getDistrictsId)

router.get("/weather", CowinController.getWeather)

router.get("/sortedCities", CowinController.sortedCities)

router.post("/memes", CowinController.getMemes)


module.exports = router;