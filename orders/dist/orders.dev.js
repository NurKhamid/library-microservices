"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var port = 7777;

var axios = require('axios');

app.use(bodyParser.json());

require("./Order");

var Order = mongoose.model("Order");
mongoose.connect("mongodb+srv://khamid:H8dTbwtyJzrP3S5c@cluster0.gmwhz.mongodb.net/ordersservice?retryWrites=true&w=majority", function () {
  console.log("Database is Connected");
});
app.get('/', function (req, res) {
  return res.send('Hello from Orders service');
});
app.post('/order', function (req, res) {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate
  };
  var order = new Order(newOrder);
  order.save().then(function () {
    res.send('Order created succesfully');
  })["catch"](function () {
    if (err) {
      throw err;
    }
  });
});
app.get('/orders', function (req, res) {
  Order.find().then(function (order) {
    res.send(order);
  })["catch"](function (err) {
    if (err) {
      throw err;
    }
  });
});
app.get('/order/:id', function (req, res) {
  Order.findById(req.params.id).then(function (order) {
    if (order) {
      //connect with 
      axios.get("http://localhost:3000/customer/" + order.CustomerID).then(function (response) {
        var orderObject = {
          customerName: response.data.name,
          bookTitle: ""
        };
        axios.get("http://localhost:4545/book/" + order.BookID).then(function (response) {
          orderObject.bookTitle = response.data.title;
          res.json(orderObject);
        });
      });
    } else {
      res.send('Invalid Order');
    }
  });
});
app.listen(port, function () {
  return console.log("Up and running - Orders service");
});