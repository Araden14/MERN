import express from "express";
import { Createunit, getUnits , RemoveUnit } from "../controllers/units.js";
import userVerification from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/create", userVerification , Createunit);
router.post("/delete", userVerification , RemoveUnit);
router.get("/get", getUnits);

export default router;