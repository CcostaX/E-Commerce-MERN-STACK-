const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    category:String,
    userId:String,  
});

module.exports = mongoose.model("products", productSchema);