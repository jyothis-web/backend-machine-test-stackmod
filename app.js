const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5174", // Allow only your frontend
      credentials: true, // Allow cookies & authentication headers
    })
  );

connectDB();


app.use("/api", authRoutes);


// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
