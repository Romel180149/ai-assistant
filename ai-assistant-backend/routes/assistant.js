const express = require("express");
const Professional = require("../models/Professional");

const router = express.Router();

// Get professionals based on query
router.get("/search", (req, res) => {
    res.send("This endpoint supports POST requests only. Please use POST.");
  });
  
// router.post("/search", async (req, res) => {
//     console.log("Request received:", req.body);
//   const { query } = req.body;
 

//   if (!query) return res.status(400).json({ error: "Query is required" });

//   try {
//     const keywords = query.toLowerCase().split(" "); // Simple keyword extraction

//     const results = await Professional.find({
//       $or: [
//         { name: { $regex: keywords.join("|"), $options: "i" } },
//         { category: { $regex: keywords.join("|"), $options: "i" } },
//         { zone: { $regex: keywords.join("|"), $options: "i" } },
//       ],
//     }).sort({ ranking: 1, rating: -1 });

//     res.status(200).json({ success: true, data: results });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });
router.post("/search", async (req, res) => {
  console.log("Request received:", req.body);
  const { query } = req.body;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Query is required and must not be empty." });
  }

  try {
    const keywords = query.toLowerCase().split(" ").filter((word) => word.length > 2); // Ignore short words
    if (keywords.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No relevant professionals found. Please refine your search."
      });
    }

    const results = await Professional.find({
      $or: [
        { name: { $regex: `\\b(${keywords.join("|")})\\b`, $options: "i" } },
        { category: { $regex: `\\b(${keywords.join("|")})\\b`, $options: "i" } },
        { zone: { $regex: `\\b(${keywords.join("|")})\\b`, $options: "i" } }
      ]
    }).sort({ ranking: 1, rating: -1 });

    if (results.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No relevant professionals found. Please refine your search."
      });
    }

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add a new professional (optional for testing)
router.post("/add", async (req, res) => {
  try {
    const newProfessional = new Professional(req.body);
    const savedProfessional = await newProfessional.save();
    res.status(201).json({ success: true, data: savedProfessional });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
