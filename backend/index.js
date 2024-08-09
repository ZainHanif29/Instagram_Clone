import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from './routes/user.routes.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api/v1/user',userRoute)

// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "Server is running",
//     success: true,
//   });
// });

app.listen(PORT, () => {
  connectDB();
  console.log("server is running", PORT);
});
