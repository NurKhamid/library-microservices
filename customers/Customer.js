const mongoose = require("mongoose");

mongoose.model("Customer", {
    //Name, Age, Address
    name : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        require : true
    },
    address : {
        type : String,
        require : true
    }
});