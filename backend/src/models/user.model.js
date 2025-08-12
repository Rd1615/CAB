const dbPromis = require("../lib/db.js");

const userModule = {
  createTableUsers: async () => {
    try {
      const db = await dbPromis;
      await db.query(`
        CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        location VARCHAR(150),
        isActive BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Table created successfully.");
    } catch (err) {
      console.error("Failed to create table:", err.message);
    }
  },

  createUser: async ({ fullName, email, password,phone,location }) => {
    try {
      const db = await dbPromis;
      const [result] = await db.query(
        `INSERT INTO users (fullName, email, password, phone, location) VALUES (?, ?, ?, ?, ?)`,
        [fullName, email, password, phone, location]
      );
      return result.insertId;
    } catch (error) {
      console.error("Failed to create user:", error.message);
    }
  },

  getUserByEmail: async (email) => {
    try {
      const db = await dbPromis;
      const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
      return rows[0];
    } catch (error) {
      console.error(" Failed to fetch user by email:", error.message);
      throw error;
    }
  },

  // ✅ Add this missing function
  getUserById: async (id) => {
    try {
      const db = await dbPromis;
      const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
      return rows[0];
    } catch (error) {
      console.error("Failed to fetch user by ID:", error.message);
      throw error;
    }
  },
};

module.exports = userModule;
