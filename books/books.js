const express = require('express');
const app = express();
const port = 4545;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const mongoose = require("mongoose");
const { send } = require('process');

//From Model
require("./Book");
const Book = mongoose.model("Book");

mongoose.connect("mongodb+srv://khamid:H8dTbwtyJzrP3S5c@cluster0.gmwhz.mongodb.net/booksservice?retryWrites=true&w=majority", () => {
    console.log("Database is Connected");
});

app.get('/', (req, res) => res.send('This is book service'));

//Create Function
app.post("/book", (req, res) =>{
    //Function
    var newBook = {
        title : req.body.title,
        author : req.body.author,
        numberPage : req.body.numberPage,
        publisher : req.body.publisher
    }

    var book = new Book(newBook);
    book.save().then(() => {
        console.log('New Book created!');
    }).catch((err) => {
        if (err) throw err;
    });
    res.send("Success created new book");
});

app.get("/books", (req, res) => {
    Book.find().then((book) => {
        res.json(book);
    }).catch((err) => {
        if (err){
            throw err;
        }
    })
})

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book);
        }else {
            res.send("Invalid ID");
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

app.delete("/book/:id", (req, res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book removed successfully");
    }).catch((err) => {
        if (err){
            throw err;
        }
    })
})


app.listen(port, () => console.log(`Example app listening on port port!`));