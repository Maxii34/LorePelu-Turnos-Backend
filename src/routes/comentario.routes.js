import { Router } from "express";
import comentarioController from "../controllers/comentarioController.js"
import validacionComentario from "../middlewares/validarComentario.js";
import { validarToken } from "../middlewares/validartoken.js";


const router = Router();

router
  .route("/")
  .post(validarToken ,validacionComentario ,comentarioController.crearComentario)
  .get(validarToken, comentarioController.obtenerComentarios);
router
  .route("/:id")
  .get(validarToken ,comentarioController.obtenerComentario)
  .put(validarToken ,validacionComentario, comentarioController.actualizarComentario)
  .patch(validarToken ,comentarioController.desactivarComentario);

export default router;
