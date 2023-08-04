import express from "express";
import { Createunit, getUnits } from "../controllers/units.js";
import userVerification from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/create", userVerification , Createunit);
router.get("/get", getUnits);

export default router;