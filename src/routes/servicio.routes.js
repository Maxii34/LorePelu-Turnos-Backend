import { Router } from "express";
import servicioController from "../controllers/servicioController.js";

const router = Router();

//http://localhost:3000/api/servicio
router
  .route("/")
  .post(servicioController.crearServicio)
  .get(servicioController.obtenerServicios);
//http://localhost:3000/api/servicio/id
router
  .route("/:id")
  .get(servicioController.obtenerServicio)
  .put(servicioController.actualizarServicio)
  .delete(servicioController.eliminarServicio);

export default router;
