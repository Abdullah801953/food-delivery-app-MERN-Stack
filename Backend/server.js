import express from "express";
import cors from "cors";
import {connectDb} from './config/db.js';
import foodRouter from "./routes/foodRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json()); //jab bhee ham frontend yani client se backend me request bheja ga tab ye use json me parse kar de ga
app.use(cors()); //iss ka madad se backend se ham frontend access kar sakte hai

// db connection
connectDb();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Working");
}); //iss method k madad se ham server se request karte hai data k leya

// server ko run karne k leya ye likhna padta hai
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

