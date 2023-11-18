import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute";
const app: Application = express();

//  To allow cross-origin requests
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//  To parse incoming requests with JSON payloads
app.use(
  express.json({
    limit: "16kb",
  })
);

//  To parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Setup Static Files
app.use(express.static("public"));

// parse Cookies
app.use(cookieParser());

// Routes Middleware
app.use("/api/v1", userRoutes);

export { app };
