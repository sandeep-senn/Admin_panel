import express from "express";
import multer from "multer";
import { uploadLeads } from "../controller/leadController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import Lead from "../model/Lead.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" }); 

router.post("/upload", protect, adminOnly, upload.single("file"), uploadLeads);

router.get("/my", protect, async (req, res) => {
  try {
    const leads = await Lead.find({ assignedTo: req.user._id });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
