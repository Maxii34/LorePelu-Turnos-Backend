import { Router } from "express";
import turnoController from "../controllers/turnoController";

const router = Router();

// Rutas para Turnos
//http://localhost:3000/api/turnos
router.post("/", turnoController.crearTurno);
router.get("/", turnoController.obtenerTurnos);
router.get("/", turnoController.obtenerTurnoPorTelefono);
router.get("/", turnoController.obtenerTurnoPorEmail);

router
  .route("/:id")
  .put(turnoController.actualizarTurno)
  .delete(turnoController.eliminarTurno);

export default router;
