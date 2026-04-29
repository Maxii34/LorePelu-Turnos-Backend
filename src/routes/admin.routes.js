import { Router } from 'express';
import { validarToken } from '../middlewares/validarToken.js'
import adminController from '../controllers/adminController.js'

const router = Router()

// Rutas públicas (no requieren token)
//http://localhost:3000/api/admin/registro
router.post('/registro', adminController.registrar)
//http://localhost:3000/api/admin/login
router.post('/login',    adminController.login)

// Rutas protegidas (requieren token)
//http://localhost:3000/api/admin/
router.get('/',          validarToken, adminController.obtenerTodos)
router.get('/:id',       validarToken, adminController.obtenerPorId)
router.put('/:id',       validarToken, adminController.actualizar)
router.delete('/:id',    validarToken, adminController.eliminar)

export default router
