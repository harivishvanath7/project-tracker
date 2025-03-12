import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/goals", goalRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Goal Tracker API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
