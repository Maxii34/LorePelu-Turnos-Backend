import Turno from "../model/turnosModelo.js";

const crearTurno = async (turnoData) => {
  return await Turno.create(turnoData);
};

const obtenerTodoTurnos = async () => {
  return await Turno.find();
};

const obtenerTurnoPorId = async (id) => {
  return await Turno.findById(id);
};

const obtenerTurnoExistente = async (email, telefono) => {
  return await Turno.findOne({
    $or: [{ email }, { telefono }],
  });
};

const actualizarTurno = async (id, turnoData) => {
  return await Turno.findByIdAndUpdate(id, turnoData, {
    returnDocument: "after",
  });
};

const eliminarTurno = async (id) => {
  return await Turno.findByIdAndDelete(id);
};

export default {
  crearTurno,
  obtenerTodoTurnos,
  obtenerTurnoExistente,
  obtenerTurnoPorId,
  actualizarTurno,
  eliminarTurno,
};
