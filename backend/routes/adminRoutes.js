import express from "express";
import { registerAdmin, loginUser } from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginUser);

export default adminRouter;
