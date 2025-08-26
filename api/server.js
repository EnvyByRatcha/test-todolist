import dotenv from "dotenv";
import express from "express";
import cors from "cors";

//---------------Router---------------//
import todolistRouter from "./route/todolist-route.js";

import { apiError } from "./utils/error.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/api/v1/todolists", todolistRouter);

app.listen(PORT, () => {
  console.log("server start");
});
