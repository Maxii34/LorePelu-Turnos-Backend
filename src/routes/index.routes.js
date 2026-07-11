import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import turnoRoutes from "./turno.routes.js";
import servicioRoutes from "./servicio.routes.js";
import comentarioRouter from "./comentario.routes.js"

const router = Router();

//Agregar las rutas aquí
router.use("/admin", adminRoutes);

router.use("/turno", turnoRoutes);

router.use("/servicio", servicioRoutes);

router.use("/comentario", comentarioRouter)

export default router;
