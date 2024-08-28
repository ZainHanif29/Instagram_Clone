import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from './routes/user.routes.js'
import postRoute from './routes/post.routes.js'
import messageRoute from './routes/message.routes.js'
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api/v1/user', userRoute)
app.use('/api/v1/post', postRoute)
app.use('/api/v1/message', messageRoute)

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
