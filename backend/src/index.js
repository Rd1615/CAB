const express = require("express");
const cors = require("cors");
const path = require('path');
const dotenv = require('dotenv');
const dbPromise = require("./lib/db.js");

const userModel = require("./models/user.model.js");
const driverModel = require("./models/driver.model.js");
const carRouteModel = require("./models/carRoute.model.js");

const authRoutes = require("./routes/auth.route.js");
const driverRoutes = require("./routes/driver.route.js");
const carRoute = require("./routes/city.route.js");
const carList = require('./routes/carList.route.js');

const cookieParser = require("cookie-parser");
const carListmodel = require("./models/carList.model.js");

const PORT = 5000;
const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173" ,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/driver",driverRoutes);
app.use("/api/city",carRoute);
app.use("api/cars",carList);

   // ✅ Serve frontend in production
  if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(frontendPath));

    // ✅ Use regex instead of "/*" to avoid path-to-regexp errors
    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  }

dbPromise
  .then(async (db) => {
    await userModel.createTableUsers();
    await driverModel.createTableDriver();
    await carRouteModel.createTableCarRoute();
    await carListmodel.createTableCarList();

    app.listen(PORT, () => {
      console.log("Server runig at portno ", PORT);
    });
  })
  .catch((err) => {
    console.error("Database initialization failed:", err.message);
  });
