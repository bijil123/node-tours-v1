const mongoose = require("mongoose");


const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name required"],
        unique: true
    },
    durations : {
        type: Number,
        required: [true,"duration required"]
    },
    maxGroupSize: {
        type: String,
        required: [true, "group size required"]
    },  
    difficulty: {
        type: String,
        required: [true, "difficulty required"]
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
      },
      ratingsQuantity: {
        type: Number,
        default: 0
      },
      price: {
        type: Number,
        required: [true, 'A tour must have a price']
      },
      priceDiscount: Number,
      summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
      },
      description: {
        type: String,
        trim: true
      },
      imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
      },
      images: [String],
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      },
      startDates: [Date]
})

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;