const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs")
require('dotenv').config();

//----------------------------------------------------------------//

// Middlewares
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json()); // To parse the data in req.body so that we can access it in json
app.use(express.urlencoded({ extended: false }));

//----------------------------------------------------------------//

// Image uploading using Multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/profilePic/'); // Folder to store images
  },
  filename: function (req, file, cb) {
    const username = req.params.username; // We get the username from POST request to '/upload/:username'
    const ext = path.extname(file.originalname); // path.extname gives the extension of the file
    cb(null, `${username}-${Date.now()}${ext}`); // Custom format: image-timestamp.EXT
  }
});

const upload = multer({ storage: storage });

// Image upload route
app.post('/upload/:username', upload.single('imageUpload'), (req, res) => {
  res.json("File uploaded successfully");
});

//----------------------------------------------------------------//

// All MongoDB collections
const { signupCollection } = require("./mongodb");
const { ratingCollection } = require("./mongodb");
// const { profilePicCollection } = require("./mongodb");

//----------------------------------------------------------------//

// GET Requests
// All pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/index.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/profile.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/login.html"));
});

app.get("/home/:username", async (req, res) => {
  // Checking whether the username is valid in the URL
  const user = await signupCollection.findOne({ Username: req.params.username })
  if (user) {
    res.sendFile(path.join(__dirname, "./public/html/home.html"));
  } else {
    res.status(404).json({ message: "Not found" })
  }
});

app.get("/userProfile/:username", async (req, res) => {
  // Checking whether the username is valid in the URL
  const user = await signupCollection.findOne({ Username: req.params.username })
  if (user) {
    res.sendFile(path.join(__dirname, "./public/html/userProfile.html"));
  } else {
    res.status(404).json({ message: "Not found" })
  }
});

app.get("/userStats/:username", async (req, res) => {
  // Checking whether the username is valid in the URL
  const user = await signupCollection.findOne({ Username: req.params.username })
  if (user) {
    res.sendFile(path.join(__dirname, "./public/html/userStats.html"));
  } else {
    res.status(404).json({ message: "Not found" })
  }
});

app.get("/rate/:username", async (req, res) => {
  // Checking whether the username is valid in the URL
  const user = await signupCollection.findOne({ Username: req.params.username })
  if (user) {
    res.sendFile(path.join(__dirname, "./public/html/rate.html"));
  } else {
    res.status(404).json({ message: "Not found" })
  }
});

//----------------------------------------------------------------//

// All /api/v1/users/ data

app.get("/api/v1/users/:username", async (req, res) => {
  const user = await signupCollection.findOne({ Username: req.params.username })
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Not found" })
  }
})

app.get('/api/v1/users/:username/ratings-data', async (req, res) => {
  const user = await ratingCollection.findOne({ username: req.params.username })
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Not found" })
  }
})

// Dealing with /profilePic directory
// Sending user's latest profile picture
app.get('/api/v1/users/:username/images', (req, res) => {
  const uploadsDir = path.join(__dirname, './public/images/profilePic/');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read directory' });
    }
    // Filter user's images
    const userImages = files.filter(file => file.split('-')[0] == req.params.username)
    const latestUserImage = userImages[userImages.length - 1];

    // If there is no image
    if (!latestUserImage) {
      return res.json({ message: "No profile picture" })
    }

    // Deleting more than 1 image of a user from the /profilePic directory 
    userImages.forEach(image => {
      if (image !== latestUserImage) {
        const oldImages = path.join(uploadsDir, image);
        fs.unlink(oldImages, (err) => {
          if (err) {
            console.error(`Error deleting file: ${image}`, err);
          } else {
            console.log(`Deleted old file: ${image}`);
          }
        });
      }
      else {
        res.json({ images: latestUserImage })
      }
    })
  });
});

// Getting random profile pictures excluding the current user's
app.get("/api/v1/users/:username/random-image", (req, res) => {
  const uploadsDir = path.join(__dirname, "./public/images/profilePic/");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directory" });
    }

    const filteredImages = files.filter(file => file.split('-')[0] !== req.params.username)

    if (filteredImages.length === 0) {
      return res.status(404).json({ error: "No images found" });
    }

    // Selecting a random image
    const randomNumber = Math.floor(Math.random() * filteredImages.length);
    const randomImage = filteredImages[randomNumber];

    res.json({ imageUrl: `../images/profilePic/${randomImage}` });
  });
});

//----------------------------------------------------------------//

// POST Requests
// SignUp functionality
app.post("/api/v1/signup", async (req, res) => {
  const checkUname = await signupCollection.findOne({ Username: req.body.Username })
  const checkEmail = await signupCollection.findOne({ Email: req.body.Email })

  if (checkUname) {
    return res.json({ success: false, message: "Username already in use" });
  } else if (checkEmail) {
    return res.json({ success: false, message: "Email already in use" });
  }
  else {
    const { FirstName, LastName, Username, Email, Password, ratingData } = req.body;
    // Create a new user (excluding ratingData)
    await signupCollection.create({ FirstName, LastName, Username, Email, Password });
    await ratingCollection.create({ username: Username, ratingReceived: ratingData.ratingReceived, ratingGiven: ratingData.ratingGiven })
    return res.status(200).json({ success: true, message: "Success" }); // JSON response
  }
});

//----------------------------------------------------------------//

// Login functionality
app.post("/api/v1/login", async (req, res) => {
  const user = await signupCollection.findOne({ Username: req.body.uname });

  if (user) {

    if (user.Password === req.body.password) {
      // Assigning token / Setting cookie
      // const token = jwt.sign({ email: user.Email }, process.env.ACCESS_TOKEN_SECRET,  { expiresIn: "1hr" });
      // res.cookie('auth_token', token, { httpOnly: true, secure: false })

      // Send back a response
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Wrong password" });
    }
  } else {
    res.json({ message: "Wrong credentials" })
  }

});

//----------------------------------------------------------------//

// Rating functionality
app.post("/api/v1/rate", async (req, res) => {

  const sentBy = req.body.sentBy;
  const ratingGiven = req.body.ratingGiven;
  const sentTo = req.body.sentTo;
  const ratingReceived = req.body.ratingReceived;

  for (let i = 1; i <= 10; i++) {
    if (ratingGiven == i && ratingReceived == i) {
      // Incrementing counter for rating given by 1
      await ratingCollection.updateOne(
        { username: sentBy },
        { $addToSet: { ratedUsers: sentTo } , // Add ratedUser only if it's not already in the array
         $inc: { [`ratingGiven.${i}`]: 1 } }
      );
      // Incrementing counter for rating received by 1
      await ratingCollection.updateOne(
        { username: sentTo }, 
        { $inc: { [`ratingReceived.${i}`]: 1 } }
      );
    }
  }

  res.json({ success: true });

});

//----------------------------------------------------------------//

// Console log only if the DB is connected to the server
const { connectDB } = require('./mongodb');
const { log } = require("console");
const PORT = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Website is live at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log(error)
  }
}

start(); // Calling function
