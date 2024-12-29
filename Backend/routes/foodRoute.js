import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodControler.js";
import multer from "multer";

const foodRouter = express.Router();

// image storage Engine

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

// middleware
const upload = multer({ storage: storage });
// data ko upload karne k leya
foodRouter.post("/add", upload.single("image"), addFood);
// data ko panna k leya
foodRouter.get("/list",listFood)
// data upload karne k leya
foodRouter.post("/remove",removeFood);

export default foodRouter;
