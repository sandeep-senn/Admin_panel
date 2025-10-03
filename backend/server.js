import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import adminRouter from "./routes/adminRoutes.js";
import agentRouter from "./routes/agentRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";


const app = express();
app.use(express.json())
app.use(cors())
dotenv.config();

app.get('/', (req, res) => {
  res.send('API working!')
})

// MongoDB Connect
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));

// Routes
app.use("/api/auth", adminRouter);   
app.use("/api/agents", agentRouter);
app.use("/api/leads", leadRoutes);

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server running at localhost ${PORT}`)
})