// app.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const parkingSpotRoutes = require("./routes/parkingSpotRoutes"); // Import the new routes
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

// Use the existing authentication routes
app.use("/auth", authRoutes);

// Use the new parking spot routes
app.use("/api", parkingSpotRoutes); // Assuming you want to use '/api' as the base URL for parking spot APIs

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
