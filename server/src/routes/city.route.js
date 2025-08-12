const express = require('express');
const carRoute = require('../controller/carRoute.controller');
const router = express.Router();

router.get('/',carRoute.getCarRoute);
router.post('/add-city',carRoute.createCity);
router.put("/delete-city",carRoute.deleteRoute);
router.put("/update-status", carRoute.toggleStatus);
module.exports = router;
