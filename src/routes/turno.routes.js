import { Router } from "express";
import turnoController from "../controllers/turnoController.js";
import { validarToken } from "../middlewares/validarToken.js";
import { turnoValidacion } from "../middlewares/turnoValidacion.js";
import validacionID from "../middlewares/validacionID.js";
import { permitirRoles } from "../middlewares/validarRoles.js";

const router = Router();

// Rutas para Turnos
//http://localhost:3000/api/turnos
router.post("/", turnoValidacion, turnoController.crearTurno);
router.get("/", turnoController.obtenerTurnos);
router.get("/buscar", turnoController.buscarTurnos);

router
  .route("/:id")
  .get(validarToken, validacionID, turnoController.obtenerTurnoPorId)
  .put(validarToken, validacionID, turnoValidacion, turnoController.actualizarTurno)
  .delete(validarToken, validacionID, permitirRoles(['administrador', 'moderador']), turnoController.eliminarTurno)
  .patch(validarToken, validacionID, permitirRoles(['administrador', 'moderador']), turnoController.actualizarEstado);

export default router;
