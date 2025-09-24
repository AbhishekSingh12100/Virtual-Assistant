import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors({
    origin: "https://virtual-assistant-w8gt.onrender.com",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 5000;

// ✅ Connect to DB first, then start server
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`✅ Server started on port ${port}`);
    });
}).catch((err) => {
    console.error("❌ Failed to connect to DB:", err.message);
});
