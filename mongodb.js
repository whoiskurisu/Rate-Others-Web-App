const mongoose = require("mongoose");

// Connecting to DB
const connectDB = (url) => {
  return mongoose
    .connect(url)
}

//----------------------------------------------------------------//

// Schema for signup
const signupSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    trim: true,
  },
  LastName: {
    type: String,
    required: true,
    trim: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
  },
});

// Collection for signup
const signupCollection = new mongoose.model("signup-data", signupSchema);

//----------------------------------------------------------------//

const ratingSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  ratedUsers: { 
    type: [String], 
    default: [] 
  },
  // Since writing RatingGiven1 through RatingGiven10 is not efficient we can use an object as the field
  ratingGiven: {
    type: Map,
    of: Number
  },
  ratingReceived: {
    type: Map,
    of: Number
  },
});

const ratingCollection = mongoose.model("rating-data", ratingSchema);

//----------------------------------------------------------------//

// Exporting
module.exports = { connectDB, signupCollection, ratingCollection };

