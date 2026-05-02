import Turno from "../model/turnosModelo.js";

const crearTurno = async (turnoData) => {
  return await Turno.create(turnoData);
};

const obtenerTurnos = async () => {
  return await Turno.find();
};

const obtenerTurnoPorId = async (id) => {
  return await Turno.findById(id);
};

const obtenerTurnoPorEmail = async (email) => {
  return await Turno.findOne({ email });
};

const obtenerTurnoPorTelefono = async (telefono) => {
  return await Turno.findOne({ telefono });
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
  obtenerTurnos,
  obtenerTurnoPorId,
  obtenerTurnoPorEmail,
  obtenerTurnoPorTelefono,
  actualizarTurno,
  eliminarTurno,
};
