const dbPromis = require("../lib/db.js");

const carListmodel = {
  createTableCarList: async () => {
    try {
        const db = await dbPromis;
        await db.query(`
            CREATE TABLE IF NOT EXISTS carList (
                id INT AUTO_INCREMENT PRIMARY KEY,
                car_name VARCHAR(100) NOT NULL,
                car_type VARCHAR(50) NOT NULL,
                car_number VARCHAR(20) NOT NULL,
                price_km DECIMAL(10,2) NOT NULL,
                isActive BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("carList Table created successfully.");
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  },

  fetchAllCars: async () => {
    try {
        
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  },

  addCar: async ({car_name,car_type,car_number,price_km}) => {
    try {
        
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  },

  updateCarDetails: async ({car_name,car_type,car_number,price_km}) => {
    try {
        
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  },

  removeCar: async(id) => {
    try {
        
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  },

  toggleCarStatus: async (id) => {
    try {
        
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  }

};

module.exports = carListmodel;
