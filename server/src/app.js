import express from "express";
import { BASE_URL } from "./constant/config.constant.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/* Route Import */
import { adminRoutes } from "./routes/admin.route.js";
import { userRoutes } from "./routes/user.route.js";
import { chatRoutes } from "./routes/chat.route.js";

/* Route use*/
app.use(`${BASE_URL}/admin`, adminRoutes);
app.use(`${BASE_URL}/user`, userRoutes);
app.use(`${BASE_URL}/chat`, chatRoutes);

app.use(errorHandler);

export { app, io,server };
