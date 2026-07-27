import { Router } from "express";
import { validarToken } from "../middlewares/validartoken.js";
import adminController from "../controllers/adminController.js";
import { permitirRoles } from "../middlewares/validarRoles.js";
import { validarAdmin, validarLogin } from "../middlewares/validarAdmin.js";
import validacionID from "../middlewares/validacionID.js";

const router = Router();

// Rutas públicas
router.post("/registro", validarAdmin, adminController.registrar);
router.post("/login", validarLogin, adminController.login);
router.post("/logout", adminController.logout);
router.get("/me", validarToken, adminController.obtenerPerfil);
router.put("/me", validarToken, adminController.actualizarPerfil);
router.delete("/me", validarToken, adminController.eliminarPerfil);

// Rutas protegidas
router.route("/").get(validarToken, adminController.obtenerTodos);

router
  .route("/:id")
  .get(
    validarToken,
    validacionID,
    permitirRoles(["administrador", "moderador"]),
    adminController.obtenerPorId,
  )
  .put(
    validarToken,
    validacionID,
    permitirRoles(["administrador", "usuario"]),
    adminController.actualizar,
  )
  .delete(
    validarToken,
    validacionID,
    permitirRoles(["administrador"]),
    adminController.eliminar,
  );

export default router;
