import { Router } from "express";

const router = Router();

//Agregar las rutas aquí
router.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de LorePelu" });
});

export default router;
