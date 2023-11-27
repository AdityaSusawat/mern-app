import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; //properly set the paths when we configure directories
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
//import { error } from "console";
//import { register } from "module";
import { register } from "./controllers/auth.js";

/* CONFIGURATION for middleware and different packages*/

const __filename = fileURLToPath(import.meta.url); //to use directory names
const __dirname = path.dirname(__filename); //returns the directory name of a path
dotenv.config(); //so we can use .env files
const app = express(); //invoke our express application so that we can use our middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use * bodyParser.urlencoded({ limit: "30mb", extended: true });
app.use(cors()); // will invoke our cross origin resource sharing policy
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //sets the directory of where we keep our assets

/* FILE STORAGE SETUP*/

const storage = multer.diskStorage({
  //this is how we save a file anytime someone uploads something
  destination: function (req, file, cb) {
    cb(null, "public/assets"); //will get saved in this folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); //anytime we need to upload a file, we will be using this variable

/* ROUTES WITH FILES */

app.post("/auth/register", upload.single("picture"), register); //locally uploads the picture in "public/assets" ; register functioned imported from auth.js

/* ROUTES */

app.use("/auth", authRoutes); //helps set up the routes ; authRoutes middleware will only be executed if the URL starts with "/auth"

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 6001; //backup port
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
