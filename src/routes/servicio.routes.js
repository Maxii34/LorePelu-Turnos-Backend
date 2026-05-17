import { Router } from "express";
import servicioController from "../controllers/servicioController.js";

const router = Router();

//http://localhost:3000/api/servicio
router
  .route("/")
  .post(servicioController.crearServicio)
  .get(servicioController.obtenerServicios);

router
  .route("/:id")
  .get(servicioController.obtenerServicio)
  .put(servicioController.actualizarServicio);

export default router;
