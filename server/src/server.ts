import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes";

// cors
const app = express();

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
