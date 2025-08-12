const dbPromis = require("../lib/db");

const carRouteModel = {
    createTableCarRoute: async () => {
        try {
            const db = await dbPromis;
            await db.query(`
                CREATE TABLE IF NOT EXISTS carRoutes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    city VARCHAR(200) UNIQUE NOT NULL,
                    isActive BOOLEAN DEFAULT(true),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log("carRoute Table created successfully.");
        } catch (error) {
            console.error("Failed to create table:", error.message);
        }
    },

    createCity: async ({ city }) => {
    try {
        const db = await dbPromis;
        const [result] = await db.query(
            `INSERT INTO carRoutes (city) VALUES (?)`,
            [city]
        );

        // fetch the newly created row
        const [rows] = await db.query(`SELECT * FROM carRoutes WHERE id = ?`, [result.insertId]);
        return rows[0];
    } catch (error) {
        console.log("Error creating city:", error.message);
    }
},

    getAllCity: async () => {
        try {
            const db = await dbPromis;
            const [result] = await db.query(`SELECT * FROM carRoutes`);
            return result;
        } catch (error) {
            console.log("Failed to get all cities:", error.message);
        }
    },

    deleteCity: async (id) => {
        try {
            const db = await dbPromis;
            const [result] = await db.query(
                `DELETE FROM carRoutes WHERE id = ?`,
                [id]
            );
            return result.affectedRows;
        } catch (error) {
            console.log("Error deleting city:", error.message);
        }
    },

    updateToggleStatus: async (id) => {
    try {
        const db = await dbPromis;
        const [result] = await db.query(
            `UPDATE carRoutes SET isActive = NOT isActive WHERE id = ?`,
            [id]
        );
        return result.affectedRows;
    } catch (error) {
        console.log("Error toggling city status:", error.message);
    }
},

};

module.exports = carRouteModel;
