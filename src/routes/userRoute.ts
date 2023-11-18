import express from "express";
import { test } from "../controllers/user.controller";

const router = express.Router();

router.route("/").get(test);

export default router;
