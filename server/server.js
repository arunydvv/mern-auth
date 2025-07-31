import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./config/connectDB.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";


dotenv.config();
connectDB();
const app = express()

app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true
}))


app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use('/api/v1/auth', authRouter )
app.use('/api/v1/user', userRouter)




app.listen(PORT, () => {
  console.clear();
  console.log("🚀 Server started on:", `http://localhost:${PORT}`);
});
