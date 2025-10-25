import cors from "cors";
import express from "express";

import errorHandler from "./error/handler";
import api from "./routes";
import { tryCatch } from "./routes/utils";

const app = express();

app.use(express.json());
app.use(cors({}));

api.get(
  "/",
  tryCatch((req, res) => {
    throw new Error("test...");
  })
);

app.use("/api", api);

app.use((req, res, next) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

export default app;
