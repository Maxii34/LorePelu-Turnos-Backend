import turnosRepository from "../repositories/turnosRepository.js";

const crearTurno = async (turnoData) => {
    const { email, telefono } = turnoData;
    if (!email || !telefono) {
        throw new Error("Faltan datos obligatorios");
    }
    const turnoExistente = await turnosRepository.obtenerTurnoExistente(email, telefono);
    if (turnoExistente) {
        if (turnoExistente.email === email) {
            throw new Error("Ya existe un turno con ese email");
        }
        if (turnoExistente.telefono === telefono) {
            throw new Error("Ya existe un turno con ese teléfono");
        }
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
}

const obtenerTurnoPorTelefono = async (telefono) => {
    const turnoTelefono = await turnosRepository.obtenerTurnoPorTelefono(telefono);
    if (!turnoTelefono) throw new Error("Turno no encontrado");
    return turnoTelefono;
}

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

export default {
    crearTurno,
    obtenerTurnos,
    obtenerTurnoPorId,
    obtenerTurnoPorEmail,
    obtenerTurnoPorTelefono,    
    actualizarTurno,
    eliminarTurno,
};  