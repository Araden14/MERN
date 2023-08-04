import express from "express";
import { getUsers } from "../controllers/dashboard.js";
import { getUser } from "../controllers/dashboard.js";
import { getUserCountry } from "../controllers/dashboard.js";
const router = express.Router();

router.get ("/user/all", getUsers); // get all users
router.get ("/user/:id", getUser); // get one user
router.get ("/country/:country", getUserCountry); // get one user


export default router;