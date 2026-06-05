import adminService from '../services/adminService.js'

const registrar = async (req, res) => {
  try {
    const admin = await adminService.registrar(req.body)
    res.status(201).json({ ok: true, mensaje: "Registro exitoso", admin })
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { token, admin } = await adminService.login(req.body)
    res.status(200).json({ ok: true, mensaje: "Sesión iniciada exitosamente", token, admin })
  } catch (error) {
    res.status(401).json({ ok: false, mensaje: error.message })
  }
}

const obtenerTodos = async (req, res) => {
  try {
    const admins = await adminService.obtenerTodos()
    res.status(200).json({ ok: true, mensaje: "Administradores obtenidos exitosamente", admins })
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message })
  }
}

const obtenerPorId = async (req, res) => {
  try {
    const admin = await adminService.obtenerPorId(req.params.id)
    res.status(200).json({ ok: true, mensaje: "Administrador obtenido exitosamente", admin })
  } catch (error) {
    res.status(404).json({ ok: false, mensaje: error.message })
  }
}

const actualizar = async (req, res) => {
  try {
    const admin = await adminService.actualizar(req.params.id, req.body)
    res.status(200).json({ ok: true, mensaje: "Administrador actualizado exitosamente", admin })
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message })
  }
}

const eliminar = async (req, res) => {
  try {
    await adminService.eliminar(req.params.id)
    res.status(200).json({ ok: true, mensaje: "Administrador eliminado exitosamente" })
  } catch (error) {
    res.status(404).json({ ok: false, mensaje: error.message })
  }
}

export default { registrar, login, obtenerTodos, obtenerPorId, actualizar, eliminar }