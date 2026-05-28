import { Router } from "express";
import comentarioController from "../controllers/comentarioController";


const router = Router();

router
  .route("/")
  .post(comentarioController.crearComentario)
  .get(comentarioController.obtenerComentarios);
router
  .route("/:id")
  .get(comentarioController.obtenerComentario)
  .put(comentarioController.actualizarComentario)
  .patch(comentarioController.desactivarComentario);

export default router;
