const driverModule = require("../models/driver.model");

exports.newDriver = async (req,res) => {
    const {fullName, mobile, carName, carType, carNumber} = req.body;
    try {
        if(!fullName || !mobile || !carName || !carType || !carNumber ){
            return res.status(400).json({message: "All fields are required "});
        };

        const existingUser = await driverModule.getDriverByMobile(mobile);
        if(existingUser) {
            res.status(409).json({message: "Driver already exists"});
        };

        const DriverId = await driverModule.createDriver({fullName, mobile, carName, carType, carNumber});
        console.log("New Driver created", DriverId);
        return res.status(201).json({message: "Driver created successfully",driverId: DriverId,});
    } catch (error) {
        console.error("newDriver controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getDriver = async (req, res) => {
  try {
    const Driver = await driverModule.getDriver();
    return res.status(200).json(Driver);
  } catch (error) {
    console.error("getDriver controller error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDriverByMobile = async (req,res) => {
    const { mobile } = req.body;
    try {
        const Driver = await driverModule.getDriverByMobile(mobile);
        return res.status(200).json(Driver);
    } catch (error) {
         console.error("getDriverByMobile controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getUpdateDriver = async (req, res) => {
  const { id, fullName, mobile, carName, carType, carNumber } = req.body;

  try {
    if (!id || !fullName || !mobile || !carName || !carType || !carNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await driverModule.getDriverById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Driver not found" });
    }

    await driverModule.updateDriver({
      id,
      fullName,
      mobile,
      carName,
      carType,
      carNumber
    });

    console.log("Driver updated:", id);
    return res.status(200).json({ message: "Driver updated successfully", driverId: id });

  } catch (error) {
    console.error("getUpdateDriver controller error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDeleteDriver = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Driver ID is required" });
    }

    const result = await driverModule.deleteDriverById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUpdateDriverStatus = async (req, res) => {
  try {
    const { id, isActive } = req.body;

    // Validation
    if (id == null || isActive == null) {
      return res.status(400).json({ message: "ID and isActive are required" });
    }

    // Check if driver exists
    const existingDriver = await driverModule.getDriverById(id);
    if (!existingDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Update status
    const updated = await driverModule.updateDriverStatus(id, isActive);

    if (!updated) {
      return res.status(400).json({ message: "Failed to update driver status" });
    }

    return res.status(200).json({ message: "Driver status updated successfully" });

  } catch (error) {
    console.error("Error update driver status:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


