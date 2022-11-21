const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const productController = require('./controllers/productController');


dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);

// Import routes
const productRoutes = require("./routes/product");

// Middlewares
app.use(express.json());
app.use(cors());

// route Middlewares
app.use("/api/products", productRoutes);
app.get('/', productController.job_scheduler);
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const jwt = require("jsonwebtoken");
const jwtKey = "jwt";

app.listen(4000, () => console.log("server up and runing on port 4000!"));
