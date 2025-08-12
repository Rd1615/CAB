const carRouteModel = require('../models/carRoute.model');

exports.createCity = async (req, res) => {
    try {
        let { city } = req.body;

        if (!city) {
            return res.status(400).json({ message: "City name is required" });
        }

        city = city.trim();

        const newCity = await carRouteModel.createCity({ city });

        return res.status(201).json(newCity); // sends {id, city, isActive}
    } catch (error) {
        console.error("createCity controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.getCarRoute = async (req,res) => {
    try {
        const result = await carRouteModel.getAllCity();
        return res.status(200).json(result);
    } catch (error) {
        console.error("getCarRoute controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteRoute = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ message: "City is required" });
        }

        // const City = city.trim().toLowerCase();

        const affectedRows = await carRouteModel.deleteCity(id);
        
        if (affectedRows === 0) {
            return res.status(404).json({ message: "City not found" });
        }

        return res.status(200).json({ message: "City deleted successfully" });

    } catch (error) {
        console.error("deleteRoute controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.toggleStatus = async (req, res) => {
    const { id } = req.body;
    try {
        // Validation
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        // Toggle status directly
        const updated = await carRouteModel.updateToggleStatus(id);

        if (!updated) {
            return res.status(404).json({ message: "Car Route not found" });
        }

        return res.status(200).json({ message: "Car Route status toggled successfully" });

    } catch (error) {
        console.error("toggleStatus controller error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

