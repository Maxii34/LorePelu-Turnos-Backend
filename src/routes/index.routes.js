import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import turnoRoutes from "./turno.routes.js";
import servicioRoutes from "./servicio.routes.js";

const router = Router();

//Agregar las rutas aquí
router.use("/admin", adminRoutes);

router.use("/turno", turnoRoutes);

router.use("/servicio", servicioRoutes);

export default router;
