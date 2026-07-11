import turnosRepository from "../repositories/turnosRepository.js";
import { ESTADOS_TURNO } from "../constants/turno.constants.js";
import { HORARIO_CONFIG, generarHorasDisponibles } from "../constants/horarios.constants.js";

const crearTurno = async (turnoData) => {
  const { nombreCliente, email, telefono } = turnoData;

  if (!nombreCliente || !email || !telefono) {
    throw new Error("Faltan datos obligatorios");
  }

  return await turnosRepository.crearTurno(turnoData);
};

const obtenerTurnos = async () => {
  return await turnosRepository.obtenerTodoTurnos();
};

const obtenerTurnoPorId = async (id) => {
  const turnoID = await turnosRepository.obtenerTurnoPorId(id);
  if (!turnoID) throw new Error("Turno no encontrado");
  return turnoID;
};

const obtenerTurnoPorEmail = async (email) => {
  const turnoEmail = await turnosRepository.obtenerTurnoPorEmail(email);
  if (!turnoEmail) throw new Error("Turno no encontrado");
  return turnoEmail;
};

const obtenerTurnoPorTelefono = async (telefono) => {
  const turnoTelefono =
    await turnosRepository.obtenerTurnoPorTelefono(telefono);
  if (!turnoTelefono) throw new Error("Turno no encontrado");
  return turnoTelefono;
};

const actualizarTurno = async (id, turnoData) => {
  const turnoEncontrado = await turnosRepository.obtenerTurnoPorId(id);
  if (!turnoEncontrado) throw new Error("Turno no encontrado");
  return await turnosRepository.actualizarTurno(id, turnoData);
};

const eliminarTurno = async (id) => {
  const turnoEncontrado = await turnosRepository.obtenerTurnoPorId(id);
  if (!turnoEncontrado) throw new Error("Turno no encontrado");
  return await turnosRepository.eliminarTurno(id);
};

const actualizarEstado = async (id, estado) => {
  if (!ESTADOS_TURNO.includes(estado)) {
    throw new Error(
      `Estado inválido. Los valores permitidos son: ${ESTADOS_TURNO.join(", ")}`,
    );
  }
  const turnoEncontrado = await turnosRepository.obtenerTurnoPorId(id);
  if (!turnoEncontrado) throw new Error("Turno no encontrado");

  if (
    turnoEncontrado.estado === "cancelado" ||
    turnoEncontrado.estado === "completado"
  ) {
    throw new Error(`El turno ${turnoEncontrado.estado} no puede modificarse`);
  }

  return await turnosRepository.actualizarEstado(id, estado);
};

const buscarTurnos = async (texto) => {
  if (!texto?.trim()) {
    return await turnosRepository.obtenerTodoTurnos();
  }

  return await turnosRepository.buscarTurnos(texto);
};

const obtenerHorariosDisponibles = async (fecha) => {
  if (!fecha) {
    throw new Error("La fecha es requerida");
  }

  const fechaObj = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  fechaObj.setHours(0, 0, 0, 0);

  if (fechaObj < hoy) {
    throw new Error("No se puede consultar fechas pasadas");
  }

  const diaSemana = fechaObj.getDay();
  if (!HORARIO_CONFIG.diasPermitidos.includes(diaSemana)) {
    throw new Error("No hay turnos disponibles para este día");
  }

  if (HORARIO_CONFIG.fechasNoPermitidas.includes(fecha)) {
    throw new Error("Esta fecha no está disponible");
  }

  const horasDisponibles = generarHorasDisponibles();
  const turnosOcupados = await turnosRepository.obtenerTurnosPorFecha(fecha);
  
  const horasOcupadas = new Set(turnosOcupados.map(turno => turno.hora));
  const horasLibres = horasDisponibles.filter(hora => !horasOcupadas.has(hora));

  return {
    fecha,
    horasDisponibles: horasLibres,
    totalDisponibles: horasLibres.length,
  };
};

export default {
  crearTurno,
  obtenerTurnos,
  obtenerTurnoPorId,
  obtenerTurnoPorEmail,
  obtenerTurnoPorTelefono,
  actualizarTurno,
  eliminarTurno,
  actualizarEstado,
  buscarTurnos,
  obtenerHorariosDisponibles,
};
