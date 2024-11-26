const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Middleware
// const corsOptions = {
//   origin: process.env.NODE_ENV === "production"
//     ? "https://your-frontend-domain.com" // Replace with your production frontend domain
//     : "http://localhost:5173", // Replace with your local frontend development domain
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods

// };
// app.use(cors(corsOptions));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const assistantRoutes = require("./routes/assistant");
app.use("/api/assistant", assistantRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the AI Assistant Backend API");
  });
  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
