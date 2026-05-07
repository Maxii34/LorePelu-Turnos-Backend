import turnoService from "../services/turnoService.js";

const crearTurno = async (req, res) => {
    try {
        const turno = await turnoService.crearTurno(req.body);
        res.status(201).json({ ok: true, turno });
    } catch (error) {
        res.status(400).json({ ok: false, mensaje: error.message })
    }
};