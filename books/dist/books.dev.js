"use strict";

var express = require('express');

var app = express();
var port = 4545;

var bodyParser = require('body-parser');

app.use(bodyParser.json());

var mongoose = require("mongoose");

var _require = require('process'),
    send = _require.send; //From Model


require("./Book");

var Book = mongoose.model("Book");
mongoose.connect("mongodb+srv://khamid:H8dTbwtyJzrP3S5c@cluster0.gmwhz.mongodb.net/booksservice?retryWrites=true&w=majority", function () {
  console.log("Database is Connected");
});
app.get('/', function (req, res) {
  return res.send('This is book service');
}); //Create Function

app.post("/book", function (req, res) {
  //Function
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPage: req.body.numberPage,
    publisher: req.body.publisher
  };
  var book = new Book(newBook);
  book.save().then(function () {
    console.log('New Book created!');
  })["catch"](function (err) {
    if (err) throw err;
  });
  res.send("Success created new book");
});
app.get("/books", function (req, res) {
  Book.find().then(function (book) {
    res.json(book);
  })["catch"](function (err) {
    if (err) {
      throw err;
    }
  });
});
app.get("/book/:id", function (req, res) {
  Book.findById(req.params.id).then(function (book) {
    if (book) {
      res.json(book);
    } else {
      res.send("Invalid ID");
    }
  })["catch"](function (err) {
    if (err) {
      throw err;
    }
  });
});
app["delete"]("/book/:id", function (req, res) {
  Book.findOneAndRemove(req.params.id).then(function () {
    res.send("Book removed successfully");
  })["catch"](function (err) {
    if (err) {
      throw err;
    }
  });
});
app.listen(port, function () {
  return console.log("Example app listening on port port!");
});