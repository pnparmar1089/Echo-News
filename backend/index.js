const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const authRoutes = require("./routes/authRoutes");
const saveRoutes = require("./routes/saveRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/save", saveRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








