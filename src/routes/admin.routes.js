import { Router } from 'express';
import { validarToken } from '../middlewares/validarToken.js'
import adminController from '../controllers/adminControlers.js'

const router = Router()

// Rutas públicas (no requieren token)

router.post('/registro', adminController.registrar)
router.post('/login',    adminController.login)

// Rutas protegidas (requieren token)

router.get('/',          validarToken, adminController.obtenerTodos)
router.get('/:id',       validarToken, adminController.obtenerPorId)
router.put('/:id',       validarToken, adminController.actualizar)
router.delete('/:id',    validarToken, adminController.eliminar)

export default router
