import express from "express";
import http from "http";
import { corsHandler } from "./config/corsHandler";
import { SERVER_PORT } from "./config/config";
import userRoutes from "./routes/userRoutes";

export const app = express();
export let httpServer: http.Server;

app.use(express.json());
app.use(corsHandler);

app.use("/api", userRoutes);

httpServer = http.createServer(app);

httpServer
  .listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
