import { Router } from "express";
import servicioController from "../controllers/servicioController.js";
import { validarToken } from "../middlewares/validartoken.js";
import { permitirRoles } from "../middlewares/validarRoles.js";
import { validarServicio } from "../middlewares/validarServicio.js";

const router = Router();

//http://localhost:3000/api/servicio
router
  .route("/")
  .post(
    validarToken,
    permitirRoles(["administrador", "moderador"]),
    validarServicio,
    servicioController.crearServicio,
  )
  .get(servicioController.obtenerServicios);

router.get("/buscar", servicioController.buscarServicios);

//http://localhost:3000/api/servicio/id
router
  .route("/:id")
  .get(
    validarToken,
    permitirRoles(["administrador", "moderador"]),
    servicioController.obtenerServicio,
  )
  .put(
    validarToken,
    permitirRoles(["administrador", "moderador"]),
    servicioController.actualizarServicio,
  )
  .delete(
    validarToken,
    permitirRoles(["administrador", "moderador"]),
    servicioController.eliminarServicio,
  );

export default router;
