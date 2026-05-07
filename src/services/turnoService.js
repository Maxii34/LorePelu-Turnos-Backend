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