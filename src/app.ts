import express from "express";
import cors from "cors";
import passport from "passport";
import "./passport";
import api from "./routes/api";
import { handleWebhook } from "./routes/webhook/webhook.controller";

const app = express();

app.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use("/v1", api);

export default app;
