const dbPromis = require("../lib/db.js");

const carListmodel = {
  createTableCarList: async () => {
    try {
        const db = await dbPromis;
        await db.query(`
            CREATE TABLE IF NOT EXISTS carList (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                type VARCHAR(50) NOT NULL,
                number VARCHAR(20) NOT NULL,
                pricePerKm DECIMAL(10,2) NOT NULL,
                isActive BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("carList Table created successfully.");
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  },

  addCar: async ({ name, type, number, pricePerKm }) => {
  try {
    const db = await dbPromis;
    const [result] = await db.query(
      `INSERT INTO carlist (name, type, number, pricePerKm) VALUES (?, ?, ?, ?)`,
      [name, type, number, pricePerKm]
    );
    return result.insertId;
  } catch (error) {
    console.error("Failed to insert car:", error.message);
  }
},

  fetchAllCars: async () => {
    try {
        const db = await dbPromis;
        const [result] = await db.query(`SELECT * FROM carlist`);
        return result;
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  },

  updateCarDetails: async ({id,name,type,number,pricePerKm}) => {
    try {
        const db = await dbPromis;
        const [result] = await db.query(
          `UPDATE carlist SET name = ?, type = ?, number = ?, pricePerKm = ? WHERE id = ?`,
          [name, type, number, pricePerKm, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  },

  removeCar: async (id) => {
    try {
      const db = await dbPromis;
      const [result] = await db.query(`DELETE FROM carlist WHERE id = ?`, [id]);
      return result.affectedRows;  // usually 1 if deleted, 0 if no match
    } catch (error) {
      console.error("Failed to delete car:", error.message);
      throw error;  // rethrow so controller can catch it
    }
  },


  toggleCarStatus: async (id) => {
    try {
        const db = await dbPromis;
        const [result] = await db.query(`UPDATE carlist SET isActive = NOT isActive WHERE id = ?`,[id]);
        return result.affectedRows;    
    } catch (error) {
        console.error("Failed to create table:", error.message);
    }
  }

};

module.exports = carListmodel;
