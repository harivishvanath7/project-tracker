import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  category: { type: String, required: true }, // DSA, MERN, Others
  progress: { type: Object, default: {} }, // Stores checkboxes state
  completedCount: { type: Number, default: 0 },
  totalCount: { type: Number, required: true },
});

export default mongoose.model("Goal", GoalSchema);
