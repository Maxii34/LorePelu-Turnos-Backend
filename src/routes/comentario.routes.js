import { Router } from "express";
import comentarioController from "../controllers/comentarioController.js"
import validacionComentario from "../middlewares/validarComentario.js";
import { validarToken } from "../middlewares/validartoken.js";
import { permitirRoles } from "../middlewares/validarRoles.js";

const router = Router();

router
  .route("/")
  .post(validarToken, permitirRoles(["administrador", "usuario"]), validacionComentario, comentarioController.crearComentario)
  .get(comentarioController.obtenerComentarios); //ruta publica - muestra comentarios.
router
  .route("/:id")
  .get(validarToken, comentarioController.obtenerComentario) //ruta publica - muestra comentario.
  .put(validarToken, permitirRoles(["administrador", "usuario"]), validacionComentario, comentarioController.actualizarComentario)
  .patch(validarToken, permitirRoles(["administrador", "usuario"]), comentarioController.desactivarComentario);

export default router;
