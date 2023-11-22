// app.js or index.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://parkeasy123:parkeasy123@userparkeasy.olqblp4.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());
// Routes
app.use("/auth", authRoutes);

// Start the server
//const PORT = process.env.PORT || 3000;
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// http://localhost:9000/auth/register/
