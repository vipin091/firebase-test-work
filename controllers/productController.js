const Product = require("../model/Product");
const moment = require("moment");
const time = moment().format("Y-m-d H:mm:ss a");
const schedule = require('node-schedule');
const jwt = require("jsonwebtoken");
const jwtKey = "jwt";

// Get All products
const product_all = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
};

// Single product
const product_details = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
};

// Add New product
const product_create = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    investedAmount: req.body.investedAmount,
    addedOn: time,
    updatedOn: time,
  });

  try {
    const savedProduct = await product.save().then((result) => {
      jwt.sign(
        { result }, jwtKey, { userType: 1 }, (err, token) => {
          res.status(201).json({ token })
        }
      )
    });
    res.send(savedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update product
const product_update = async (req, res) => {
  try {
    const product = {
      title: req.body.title,
      price: req.body.price,
      investedAmount: req.body.investedAmount,
      addedOn: time,
      updatedOn: time,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      product
    );
    res.json(updatedProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete product
const product_delete = async (req, res) => {
  try {
    const removeProduct = await Product.findByIdAndDelete(req.params.productId);
    res.json(removeProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

//scheduler to update product

const job_scheduler = async (req, res) => {
  try {
    schedule.scheduleJob('* * * 4 * *', async function () {

      const product = {
        investedAmount: 0,
      };

      const updatedProduct = await Product.update(
        product
      );
      res.json(updatedProduct);

    });
  } catch (error) {
    res.json({ message: error });
  }
}

module.exports = {
  product_all,
  product_details,
  product_create,
  product_update,
  product_delete,
  job_scheduler,
}