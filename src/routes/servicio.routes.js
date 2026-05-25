import { Router } from "express";
import servicioController from "../controllers/servicioController.js";
import { validarToken } from "../middlewares/validarToken.js";
import { permitirRoles } from "../middlewares/validarRoles.js";

const router = Router();

//http://localhost:3000/api/servicio                   
router
  .route("/")
  .post(validarToken, permitirRoles(['administrador', 'moderador']), servicioController.crearServicio)
  .get(validarToken, permitirRoles(['administrador', 'moderador']), servicioController.obtenerServicios);
  
//http://localhost:3000/api/servicio/id
router
  .route("/:id")
  .get(validarToken, permitirRoles(['administrador', 'moderador']), servicioController.obtenerServicio)
  .put(validarToken, permitirRoles(['administrador', 'moderador']), servicioController.actualizarServicio)
  .delete(validarToken, permitirRoles(['administrador', 'moderador']), servicioController.eliminarServicio);

export default router;
