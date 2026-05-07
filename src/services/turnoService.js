import turnosRepository from "../repositories/turnosRepository";

const crearTurno = async (turnoData) => {
    // Validar que se proporcionen los datos obligatorios
    const { email, telefono } = turnoData;
    if (!email || !telefono) {
        throw new Error("Faltan datos obligatorios");
    }
    // Verificar si ya existe un turno con el mismo email o teléfono
    const turnoExistenteEmail = await turnosRepository.obtenerTurnoPorEmail(turnoData.email);
    if (turnoExistenteEmail) {
        throw new Error("Ya existe un turno con ese email");
    }
    const turnoExistenteTelefono = await turnosRepository.obtenerTurnoPorTelefono(turnoData.telefono);
    if (turnoExistenteTelefono) {
        throw new Error("Ya existe un turno con ese teléfono");
    }
    // Crear el nuevo turno
    const turno = await turnosRepository.crearTurno(turnoData);
    return turno;
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