const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");

// DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("DB failed to connect", error));

// checking api
app.get("/api/health", (req, res) => {
  console.log("hey health");
  res.json({
    service: "Story sharing platform",
    status: "active",
    time: new Date(),
  });
});

app.use("/api/v1/auth", authRoutes);

// Starting server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend Server running at ${PORT}`);
});
