import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); //will allow express to identify that these routes will all be configured ; allows to store in separate files

router.post("/login", login); //anytime "/auth/login/" is accessed, login will run ; login function will be set up in ""./controllers/auth.js"

export default router;
