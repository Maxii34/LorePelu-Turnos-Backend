import { Router } from "express";
import turnoController from "../controllers/turnoController";

const router = Router();

// Rutas para Turnos
//http://localhost:3000/api/turnos
router.post("/", turnoController.crearTurno);
router.get("/", turnoController.obtenerTurnos);

export default router;
