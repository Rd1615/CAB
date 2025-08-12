const express = require('express');
const router = express.Router();
const driverController = require("../controller/driver.controller");

router.get("/",driverController.getDriver);
router.get("/mobile",driverController.getDriverByMobile);
router.post("/newdriver",driverController.newDriver);
router.put("/update",driverController.getUpdateDriver);
router.post("/delete", driverController.getDeleteDriver);
router.put("/update-status", driverController.getUpdateDriverStatus);



module.exports = router;