import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes";

const app = express();
// CORS Options
const corsOptions = {
  origin: (process.env?.ALLOWED_ORIGIN || "http://localhost:3333").split(","),
  methods: (process.env?.ALLOWED_METHODS || "GET", "POST").split(","),
};

// cors
app.use(cors(corsOptions));
app.use(express.json());

// env
const SERVER_PORT = process.env.SERVER_PORT ?? 3333;
const MONGO_URI = process.env.MONGO_URI as string;

// router
app.use("/", router);

// start app after connecting mongodb
mongoose.connect(MONGO_URI).then(() => {
  app.listen(SERVER_PORT, () => {
    console.log(`🟢 Server is running on ${SERVER_PORT}`);
  });
});

export default app;
