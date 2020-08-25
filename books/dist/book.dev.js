"use strict";

var mongoose = require("mongoose");

mongoose.model("Book", {
  //Title, Author, numberPage, publisher
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  numberPage: {
    type: Number,
    require: false
  },
  publisher: {
    type: String,
    require: false
  }
});