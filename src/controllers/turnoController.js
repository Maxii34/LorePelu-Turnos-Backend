import turnoService from "../services/turnoService.js";

const crearTurno = async (req, res) => {
    try {
        const turno = await turnoService.crearTurno(req.body);
        res.status(201).json({ ok: true, turno });
    } catch (error) {
        res.status(400).json({ ok: false, mensaje: error.message })
    }
};

const obtenerTurnos = async (req, res) => {
    try {
        const turnos = await turnoService.obtenerTurnos();
        res.json({ ok: true, turnos });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: error.message })
    }
};

export default { crearTurno, obtenerTurnos };