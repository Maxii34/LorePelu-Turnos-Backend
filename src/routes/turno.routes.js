import { Router } from "express";
import turnoController from "../controllers/turnoController.js";

const router = Router();

// Rutas para Turnos
//http://localhost:3000/api/turnos
router.post("/", turnoController.crearTurno);
router.get("/", turnoController.obtenerTurnos);

router
  .route("/:id")
  .get(turnoController.obtenerTurnoPorId)
  .put(turnoController.actualizarTurno)
  .delete(turnoController.eliminarTurno)
  .patch(turnoController.actualizarEstado);

export default router;
