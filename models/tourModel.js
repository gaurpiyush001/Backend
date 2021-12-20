const mongoose = require('mongoose');


//Creating TourSchema for creating models out of it
//Model is simply a wrapper around Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],//error statement
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
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
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Syntax for creating a Model out of schema, here first parameter is the name of model
const Tour = mongoose.model('Tour', tourSchema);


module.exports = Tour;//WE WIL EXPORT THIS TOUR MODEL TO CONTROLLERS
/*
//below will be the new document'testTour' created out of the Tour Model
const testTour = new Tour({//this testTour document that we just created is an instance of tour Model
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497
})
//now this testTour document have a couple of methods that we can use in order to interact with the database

//this will save the document to tours collection in database, this will return a promise
//below resolved promise that we get is same document as it is stored in database
testTour.save().then(doc => {
  console.log();
}).catch(err => {
  console.log('ERROR : ', err);
})
*/