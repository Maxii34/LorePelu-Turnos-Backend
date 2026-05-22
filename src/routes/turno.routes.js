import { Router } from "express";
import turnoController from "../controllers/turnoController.js";
import { validarToken } from "../middlewares/validarToken.js";
import { turnoValidacion } from "../middlewares/turnoValidacion.js";

const router = Router();

// Rutas para Turnos
//http://localhost:3000/api/turnos
router.post("/", validarToken, turnoValidacion, turnoController.crearTurno);
router.get("/", validarToken, turnoController.obtenerTurnos);

router
  .route("/:id")
  .get(validarToken, turnoController.obtenerTurnoPorId)
  .put(validarToken, turnoValidacion, turnoController.actualizarTurno)
  .delete(validarToken, turnoController.eliminarTurno)
  .patch(validarToken, turnoController.actualizarEstado);

export default router;
