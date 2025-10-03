import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createAgent,
  getAgents,
  updateAgent,
  deleteAgent,
} from "../controller/agentController.js";

const agentRouter = express.Router();

agentRouter.post("/", protect, adminOnly, createAgent);   
agentRouter.get("/", protect, adminOnly, getAgents);         
agentRouter.put("/:id", protect, adminOnly, updateAgent);     
agentRouter.delete("/:id", protect, adminOnly, deleteAgent);  

export default agentRouter;

