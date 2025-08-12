const express = require("express");
const cors = require("cors");
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
    origin: "http://localhost:5173",
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
