import { Router } from 'express';
import { validarToken } from '../middlewares/validarToken.js'
import adminController from '../controllers/adminController.js'
import { permitirRoles } from '../middlewares/validarRoles.js'
import { validarAdmin, validarLogin } from '../middlewares/validarAdmin.js';
import validacionID from '../middlewares/validacionID.js';

const router = Router()

// Rutas públicas (no requieren token)
//http://localhost:3000/api/admin/registro
router.post('/registro',validarAdmin, adminController.registrar)
//http://localhost:3000/api/admin/login
router.post('/login',validarLogin, adminController.login)

// Rutas protegidas (requieren token)
//http://localhost:3000/api/admin/
router.route('/')
  .get(validarToken, adminController.obtenerTodos)

router.route('/:id')
  .get(validarToken, validacionID, permitirRoles(['administrador', 'moderador']), adminController.obtenerPorId)
  .put(validarToken, validacionID,  permitirRoles(['administrador', 'usuario']), adminController.actualizar)
  .delete(validarToken, validacionID,  permitirRoles(['administrador']), adminController.eliminar)


export default router
