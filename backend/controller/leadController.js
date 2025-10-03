import Lead from "../model/Lead.js";
import User from "../model/User.js";
import csv from "csv-parser";
import fs from "fs";

export const uploadLeads = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const agents = await User.find({ role: "agent" });
    if (agents.length === 0) {
      return res.status(400).json({ message: "No agents found" });
    }

    let leads = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        leads.push({
          firstName: row.FirstName,
          phone: row.Phone,
          notes: row.Notes,
        });
      })
      .on("end", async () => {
        let savedLeads = [];

        for (let i = 0; i < leads.length; i++) {
          let agent = agents[i % agents.length]; 
          let lead = new Lead({
            ...leads[i],
            assignedTo: agent._id,
          });
          await lead.save();
          savedLeads.push(lead);
        }

        fs.unlinkSync(req.file.path); 
        res.status(201).json({
          message: "Leads uploaded and distributed successfully",
          leads: savedLeads,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
