import Turno from "../model/turnosModelo.js";

const populate = { path: "servicio", select: "nombre precio duracionMin" };

const crearTurno = async (turnoData) => {
  const turno = await Turno.create(turnoData);
  return await turno.populate(populate);
};

const obtenerTodoTurnos = async () => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return await Turno.find({ fecha: { $gte: hoy } })
    .sort({ fecha: 1, hora: 1 })
    .populate(populate);
};

const obtenerTurnoPorId = async (id) => {
  return await Turno.findById(id).populate(populate);
};

const obtenerTurnoExistente = async (email, telefono) => {
  return await Turno.findOne({
    $or: [{ email }, { telefono }],
  });
};

const actualizarTurno = async (id, turnoData) => {
  return await Turno.findByIdAndUpdate(id, turnoData, {
    returnDocument: "after",
  }).populate(populate);
};

const eliminarTurno = async (id) => {
  return await Turno.findByIdAndDelete(id);
};

const actualizarEstado = async (id, estado) => {
  return await Turno.findByIdAndUpdate(
    id,
    { $set: { estado } },
    { new: true }
  ).populate(populate);
};

export default {
  crearTurno,
  obtenerTodoTurnos,
  obtenerTurnoExistente,
  obtenerTurnoPorId,
  actualizarTurno,
  eliminarTurno,
  actualizarEstado,
};