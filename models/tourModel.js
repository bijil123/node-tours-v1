const mongoose = require("mongoose");


const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name required"],
        unique: true
    },
    rating: {
        default: 4.5,
        type: Number
    },
    price: {
        type: Number,
        required: [true, "price required"]
    }
})

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;