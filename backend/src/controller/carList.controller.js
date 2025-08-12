const carListmodel = require('../models/carList.model');

exports.createNewCar = async (req,res) => {
    const {name,type,number,pricePerKm} = req.body;
    try {
        if(!name || !type || !number || !pricePerKm){
            return res.status(400).json({ message: "All Fild are required" });
        }

        const data = await carListmodel.addCar({name,type,number,pricePerKm});
        return res.status(201).json({ message: "Car Add successfully",id: data});
    } catch (error) {
        console.error("create carList controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getCarListData = async (req,res) => {
    try {
        const result = await carListmodel.fetchAllCars();
        return res.status(200).json(result);
    } catch (error) {
        console.error("get CarList controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateCarInfo = async (req,res) => {
    const {id,name,type,number,pricePerKm} = req.body;
     try {
        if(!id || !name || !type || !number || !pricePerKm){
            return res.status(400).json({ message: "All Fild are required" });
        }

        const result = await carListmodel.updateCarDetails({id,name,type,number,pricePerKm});
        return res.status(200).json({ message: "car updated successfully", result: result });
    } catch (error) {
        console.error("update CarList controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteCarById = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ message: "Car id is required" });
        }
        const result = await carListmodel.removeCar(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error("delete car controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
    };


exports.changeCarStatus = async (req,res) => {
    const {id} = req.body;
     try {
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const updated = await carListmodel.toggleCarStatus(id);

        if (!updated) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json({ message: "Car status toggled successfully" });
    } catch (error) {
        console.error("update car Status controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};