import Turno from "../model/turnosModelo.js";
import { ESTADOS_TURNO_ACTIVOS } from "../constants/turno.constants.js";

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
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const filtros = [
    { estado: { $in: ESTADOS_TURNO_ACTIVOS } },
    { fecha: { $gte: hoy } },
  ];

  const condiciones = [];

  if (typeof email === "string" && email.trim()) {
    condiciones.push({ email: email.trim().toLowerCase() });
  }

  if (typeof telefono === "string" && telefono.trim()) {
    condiciones.push({ telefono: telefono.trim() });
  }

  if (condiciones.length === 0) {
    return null;
  }

  if (condiciones.length === 1) {
    filtros.push(condiciones[0]);
  } else {
    filtros.push({ $or: condiciones });
  }

  return await Turno.findOne(Object.assign({}, ...filtros));
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

const obtenerTurnosPorFecha = async (fecha) => {
  return await Turno.find({
    fecha: fecha,
    estado: { $in: ESTADOS_TURNO_ACTIVOS },
  })
    .select("hora")
    .sort({ hora: 1 });
};

const buscarTurnos = async (texto) => {
  return await Turno.find({
    $or: [
      { nombreCliente: { $regex: texto, $options: "i" } },
      { email: { $regex: texto, $options: "i" } },
      { telefono: { $regex: texto, $options: "i" } },
      { estado: { $regex: texto, $options: "i" } },
    ],
  })
    .populate(populate)
    .sort({ fecha: 1, hora: 1 });
};


export default {
  crearTurno,
  obtenerTodoTurnos,
  obtenerTurnoExistente,
  obtenerTurnoPorId,
  obtenerTurnosPorFecha,
  actualizarTurno,
  eliminarTurno,
  actualizarEstado,
  buscarTurnos,
};