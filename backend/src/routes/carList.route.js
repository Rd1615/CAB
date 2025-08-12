const express = require('express');
const router = express.Router()
const carList = require('../controller/carList.controller');

router.get('/',carList.getCarListData);
router.post('/add-car',carList.createNewCar);
router.put('/update-car',carList.updateCarInfo);
router.put('/update-car-status',carList.changeCarStatus);
router.put('/delete-car',carList.deleteCarById);

module.exports = router;