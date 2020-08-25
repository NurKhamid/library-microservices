"use strict";

var express = require('express');

var app = express();

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var _require = require('mongoose'),
    mongo = _require.mongo;

var port = 3000;
app.use(bodyParser.json());

require("./Customer");

var Customer = mongoose.model("Customer");
mongoose.connect("mongodb+srv://khamid:H8dTbwtyJzrP3S5c@cluster0.gmwhz.mongodb.net/customersservice?retryWrites=true&w=majority", function () {
  console.log("Database is Connected");
});
app.get('/', function (req, res) {
  return res.send('This is Customer service');
});
app.post("/customer", function (req, res) {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  };
  var customer = new Customer(newCustomer);
  customer.save().then(function () {
    res.send("Customer created successfully");
  })["catch"](function (err) {
    if (err) {
      throw err;
    }
  });
});
app.get('/customers', function (req, res) {
  Customer.find().then(function (customers) {
    res.json(customers);
  })["catch"](function (err) {
    if (err) {
      throw err;
    }
  });
});
app.get('/customer/:id', function (req, res) {
  Customer.findById(req.params.id).then(function (customer) {
    if (customer) {
      res.json(customer);
    } else {
      res.send('Invalid ID');
    }
  })["catch"](function (err) {
    if (err) {
      throw err;
    }
  });
});
app["delete"]('/customer/:id', function (req, res) {
  Customer.findOneAndRemove(req.params.id).then(function () {
    res.send('Customer deleted succesfully');
  })["catch"](function (err) {
    if (err) {
      throw err;
    }
  });
});
app.listen(port, function () {
  return console.log("Up and running - Customer Service");
});