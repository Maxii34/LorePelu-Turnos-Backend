import turnoService from "../services/turnoService.js";

const crearTurno = async (req, res) => {
  try {
    const turnoCreado = await turnoService.crearTurno(req.body);
    res.status(201).json({
      ok: true, 
      mensaje: "Turno creado",
      turno: turnoCreado 
    });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

const obtenerTurnos = async (req, res) => {
  try {
    const turnosObtenidos = await turnoService.obtenerTurnos();
    res.status(200).json({
        ok: true, 
        mensaje: "Turnos obtenidos", 
        turno: turnosObtenidos
      });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const obtenerTurnoPorId = async (req, res) => {
  try {
    const turnoID = await turnoService.obtenerTurnoPorId(req.params.id);
    res.status(200).json({
      ok: true, 
      mensaje: "Turno obtenido", 
      turno: turnoID });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const actualizarTurno = async (req, res) => {
  try {
    const turnoActualizado = await turnoService.actualizarTurno(
      req.params.id,
      req.body
    );
    res.status(200).json({
      ok: true,
      mensaje: "Turno Actualizado",
      turno: turnoActualizado,
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const eliminarTurno = async (req, res) => {
  try {
    const turnoEliminado = await turnoService.eliminarTurno(
      req.params.id,
    );
    res.status(200).json({
      ok: true,
      mensaje: "Turno Eliminado",
      turno: turnoEliminado
    })
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const actualizarEstado = async (req, res) => {
  try {
    const turnoActualizado = await turnoService.actualizarEstado(
      req.params.id,
      req.body.estado
    );
    res.status(200).json({
      ok: true,
      mensaje: "Estado actualizado",
      turno: turnoActualizado,
    });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

export default {
  crearTurno,
  obtenerTurnos,
  obtenerTurnoPorId,
  actualizarTurno,
  eliminarTurno,
  actualizarEstado,
};
