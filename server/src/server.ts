import express from "express";

const app = express();

const SERVER_PORT = process.env.SERVER_PORT ?? 3333;

app.listen(SERVER_PORT, () => {
  console.log(`🟢 Server is running on ${SERVER_PORT}`);
});

export default app;
