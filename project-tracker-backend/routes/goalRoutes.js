import express from "express";
import Goal from "../models/Goal.js";

const router = express.Router();

// Get progress for a specific category
router.get("/:category", async (req, res) => {
  try {
    const goal = await Goal.findOne({ category: req.params.category });
    if (!goal) return res.status(404).json({ message: "No data found" });
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save or update progress
router.post("/:category", async (req, res) => {
  const { progress, completedCount, totalCount } = req.body;

  try {
    let goal = await Goal.findOne({ category: req.params.category });

    if (goal) {
      // Update existing record
      goal.progress = progress;
      goal.completedCount = completedCount;
      await goal.save();
      return res.json(goal);
    }

    // Create a new record
    goal = new Goal({
      category: req.params.category,
      progress,
      completedCount,
      totalCount,
    });

    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
