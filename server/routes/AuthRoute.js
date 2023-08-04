import {Signup, Login}  from "../controllers/AuthController.js";

import express from "express";
import userVerification from "../middleware/AuthMiddleware.js";
import Middlewareres from "../middleware/Middlewareres.js";

const router= express.Router();

router.post("/", userVerification, Middlewareres);
router.post("/signup", Signup);
router.post("/login", Login);
export default router;