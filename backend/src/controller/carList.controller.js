const carListmodel = require('../models/carList.model');

exports.createNewCar = async (req,res) => {
    try {
        
    } catch (error) {
        console.error("create carList controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getCarListData = async (req,res) => {
    try {
        
    } catch (error) {
        console.error("get CarList controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateCarInfo = async (req,res) => {
     try {
        
    } catch (error) {
        console.error("update CarList controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteCarById = async (req,res) => {
     try {
        
    } catch (error) {
        console.error("delete car controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.changeCarStatus = async (req,res) => {
     try {
        
    } catch (error) {
        console.error("update car Status controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};