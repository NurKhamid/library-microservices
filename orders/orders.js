const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 7777;
const axios = require('axios');

app.use(bodyParser.json());

require("./Order");
const Order = mongoose.model("Order");

mongoose.connect("mongodb+srv://khamid:H8dTbwtyJzrP3S5c@cluster0.gmwhz.mongodb.net/ordersservice?retryWrites=true&w=majority", () => {
    console.log("Database is Connected");
});

app.get('/', (req, res) => res.send('Hello from Orders service'));

app.post('/order', (req, res) => {
    var newOrder = {
        CustomerID : mongoose.Types.ObjectId(req.body.CustomerID),
        BookID : mongoose.Types.ObjectId(req.body.BookID),
        initialDate : req.body.initialDate,
        deliveryDate : req.body.deliveryDate
    }

    var order = new Order(newOrder);
    order.save().then(() => {
        res.send('Order created succesfully');
    }).catch(() => {
        if (err){
            throw err;
        }
    });
});

app.get('/orders', (req, res) => {
    Order.find().then((order) => {
        res.send(order);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
});

app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            
            //connect with 
            axios.get("http://localhost:3000/customer/" + order.CustomerID).then((response) => {
                var orderObject = {customerName : response.data.name, bookTitle : "" }
                axios.get("http://localhost:4545/book/" + order.BookID).then((response) => {
                    orderObject.bookTitle = response.data.title;
                    res.json(orderObject);
                })
            })
        }else{
            res.send('Invalid Order');
        }
    })
});

app.listen(port, () => console.log(`Up and running - Orders service`));