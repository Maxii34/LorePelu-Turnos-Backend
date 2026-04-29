import { Router } from "express";
import adminRoutes from "./admin.routes.js";

const router = Router();

//Agregar las rutas aquí
router.use('/admins', adminRoutes);

export default router;
