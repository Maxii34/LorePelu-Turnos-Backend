import { Router } from "express";
import turnoController from "../controllers/turnoController.js";
import { validarToken } from "../middlewares/validarToken.js";
import { turnoValidacion } from "../middlewares/turnoValidacion.js";

const router = Router();

// Rutas para Turnos
//http://localhost:3000/api/turnos
router.post("/", turnoValidacion, turnoController.crearTurno);
router.get("/", turnoController.obtenerTurnos);

router
  .route("/:id")
  .get(turnoController.obtenerTurnoPorId)
  .put(turnoValidacion, turnoController.actualizarTurno)
  .delete(turnoController.eliminarTurno)
  .patch(turnoController.actualizarEstado);

export default router;
