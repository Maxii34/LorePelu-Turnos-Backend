import turnoService from "../services/turnoService.js";

const crearTurno = async (req, res) => {
  try {
    const turnoCreado = await turnoService.crearTurno(req.body);
    res.status(201).json({ ok: true, turnoCreado });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

const obtenerTurnos = async (req, res) => {
  try {
    const turnosObtenidos = await turnoService.obtenerTurnos();
    res.status(200).json({ ok: true, turnosObtenidos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const obtenerTurnoPorId = async (req, res) => {
  try {
    const turnoID = await turnoService.obtenerTurnoPorId(req.params.id);
    res.status(200).json({ ok: true, turnoID });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const obtenerTurnoPorEmail = async (req, res) => {
  try {
    const turnoEnail = await turnoService.obtenerTurnoPorEmail(
      req.params.email,
    );
    res.status(200).json({ ok: true, turnoEnail });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const obtenerTurnoPorTelefono = async (req, res) => {
  try {
    const turnoTelefono = await turnoService.obtenerTurnoPorTelefono(
      req.params.telefono,
    );
    res.status(200).json({ ok: true, turnoTelefono });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const actualizarTurno = async (req, res) => {
  try {
    const turnoActualizado = await turnoService.actualizarTurno(
      req.params.actualizarTurno,
    );
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const eliminarTurno = async (req, res) => {
  try {
    const turnoEliminado = await turnoService.eliminarTurno(
      req.params.EliminarTurno,
    );
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export default {
  crearTurno,
  obtenerTurnos,
  obtenerTurnoPorId,
  obtenerTurnoPorEmail,
  obtenerTurnoPorTelefono,
  actualizarTurno,
  eliminarTurno,
};
