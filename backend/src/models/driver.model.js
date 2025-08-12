const dbPromis = require("../lib/db.js");

const driverModule = {
  createTableDriver: async () => {
    try {
      const db = await dbPromis;
      db.query(`
        CREATE TABLE IF NOT EXISTS driver (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255),
        mobile VARCHAR(20) UNIQUE NOT NULL,
        carName VARCHAR(50),
        carType VARCHAR(50),
        carNumber VARCHAR(50),
        isActive BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

      console.log("Driver Table created successfully.");
    } catch (error) {
      console.error("Failed to create table:", error.message);
    }
  },

  createDriver: async ({ fullName, mobile, carName, carType, carNumber }) => {
    try {
      const db = await dbPromis;
      const [result] = await db.query(
        `INSERT INTO driver(fullName,mobile,carName,carType,carNumber) VALUES(?, ?, ?, ?, ?)`,
        [fullName, mobile, carName, carType, carNumber]
      );
      return result.insertId;
    } catch (error) {
      console.error("Failed to create Driver:", error.message);
    }
  },

  getDriver: async () => {
    try {
      const db = await dbPromis;
      const [result] = await db.query(`SELECT * FROM driver`);
      return result;
    } catch (error) {
      console.log("Failed to get drivers:", error.message);
    }
  },

  getDriverByMobile: async (mobile) => {
    try {
      const db = await dbPromis;
      const [result] = await db.query(`SELECT * FROM driver WHERE mobile = ?`, [
        mobile,
      ]);
      return result[0];
    } catch (error) {
      console.log("Failed to get drivers:", error.message);
    }
  },

  getDriverById: async (id) => {
    try {
    const db = await dbPromis;
    const [rows] = await db.query("SELECT * FROM driver WHERE id = ?", [id]);
    return rows[0]; // return the first row (or null if not found)
  } catch (error) {
    console.error("Error in getDriverById:", error.message);
    throw error;
  }
  },

  updateDriver: async ({
    id,
    fullName,
    mobile,
    carName,
    carType,
    carNumber,
  }) => {
    try {
      const db = await dbPromis;
      const [result] = await db.query(
        `UPDATE driver SET fullName = ?,mobile = ?,carName = ?,carType = ?,carNumber = ? WHERE id = ?`,
        [fullName, mobile, carName, carType, carNumber, id] // ✅ include id here
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Failed to update Driver:", error.message);
    }
  },

  deleteDriverById: async (id) => {
  const db = await dbPromis;
  const [result] = await db.query("DELETE FROM driver WHERE id = ?", [id]);
  return result;
},

updateDriverStatus: async (id, isActive) => {
  try {
    const db = await dbPromis;
    const [result] = await db.query(
      `UPDATE driver SET isActive = ? WHERE id = ?`,
      [isActive, id]
    );
    return result.affectedRows > 0; // returns true if the update happened
  } catch (error) {
    console.error("Failed to update driver status:", error.message);
    throw error;
  }
},


};

module.exports = driverModule;
