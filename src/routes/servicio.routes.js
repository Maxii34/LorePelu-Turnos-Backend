import { Router } from "express";
import servicioController from "../controllers/servicioController.js";

const router = Router()

router.route("/").post(servicioController.crearServicio)

export default router;