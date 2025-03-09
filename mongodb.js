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
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
  },
  // Since writing RatingGiven1 through RatingGiven10 is not efficient we can use an object as the field
  RatingGiven: { 
    type: Map,
    of: Number 
  },
  RatingReceived: {
     type: Map, 
     of: Number 
  },
});

// Collection for signup
const signupCollection = new mongoose.model("signup-data", signupSchema);

//----------------------------------------------------------------//

// Schema for profilePic
// const profilePic = new mongoose.Schema({
//   Username: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   Email: {
//     type: String,
//     required: true,
//     trim: true,
//   },
// });

// // Collection for profilePic
// const profilePicCollection = new mongoose.model("profile-picture", profilePic);

//----------------------------------------------------------------//

// Exporting
module.exports = { connectDB, signupCollection };

