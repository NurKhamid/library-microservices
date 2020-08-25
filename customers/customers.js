const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { mongo } = require('mongoose')
const port = 3000

app.use(bodyParser.json());

require("./Customer");
const Customer = mongoose.model("Customer");

mongoose.connect("mongodb+srv://khamid:H8dTbwtyJzrP3S5c@cluster0.gmwhz.mongodb.net/customersservice?retryWrites=true&w=majority", () => {
    console.log("Database is Connected");
});

app.get('/', (req, res) => res.send('This is Customer service'))

app.post("/customer", (req, res) => {
    var newCustomer = {
        name : req.body.name,
        age : req.body.age,
        address : req.body.address
    }

    var customer = new Customer(newCustomer)

    customer.save().then(() => {
        res.send("Customer created successfully");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

app.listen(port, () => console.log(`Up and running - Customer Service`));