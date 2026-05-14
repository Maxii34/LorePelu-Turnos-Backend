import { Router } from "express";
import servicioController from "../controllers/servicioController";
import router from "./turno.routes";

const route = Router()

router.route("/").post(servicioController.crearServicio)

export default route;