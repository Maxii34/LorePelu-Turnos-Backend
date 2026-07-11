/**
 * BACKEND - Middleware para validar fechas y horas
 * Archivo: middlewares/validarHorario.js
 * 
 * IMPORTANTE: Siempre validar en el backend, nunca confiar solo en el frontend
 */

const HORARIO_CONFIG = {
  diasPermitidos: [1, 2, 3, 4, 5], // Lunes a viernes
  horaInicio: 9,
  horaFin: 18,
  intervalo: 30,
  fechasNoPermitidas: [
    "2024-12-25",
    "2024-01-01",
  ],
};

const nombresDias = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miércoles",
  4: "jueves",
  5: "viernes",
  6: "sábado",
};

/**
 * Middleware para validar fecha y hora
 */
export const validarHorario = (req, res, next) => {
  try {
    const { fecha, hora } = req.body;

    // Validar que existan
    if (!fecha || !hora) {
      return res.status(400).json({
        error: "Fecha y hora son requeridas",
      });
    }

    // Validar formato de fecha (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return res.status(400).json({
        error: "Formato de fecha inválido (debe ser YYYY-MM-DD)",
      });
    }

    // Validar formato de hora (HH:MM)
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hora)) {
      return res.status(400).json({
        error: "Formato de hora inválido (debe ser HH:MM)",
      });
    }

    // Validar que la fecha no sea pasado
    const fechaObj = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaObj.setHours(0, 0, 0, 0);

    if (fechaObj < hoy) {
      return res.status(400).json({
        error: "No se puede reservar para fechas pasadas",
      });
    }

    // Validar día de la semana
    const diaSemana = fechaObj.getDay();
    if (!HORARIO_CONFIG.diasPermitidos.includes(diaSemana)) {
      const diasDisponibles = HORARIO_CONFIG.diasPermitidos
        .map((d) => nombresDias[d])
        .join(", ");
      return res.status(400).json({
        error: `Solo se permiten: ${diasDisponibles}`,
      });
    }

    // Validar que no sea fecha festiva
    if (HORARIO_CONFIG.fechasNoPermitidas.includes(fecha)) {
      return res.status(400).json({
        error: "Esta fecha no está disponible",
      });
    }

    // Validar rango de horas
    const [horaNum, minutoNum] = hora.split(":").map(Number);

    if (
      horaNum < HORARIO_CONFIG.horaInicio ||
      horaNum >= HORARIO_CONFIG.horaFin
    ) {
      const horaInicio = String(HORARIO_CONFIG.horaInicio).padStart(2, "0");
      const horaFin = String(HORARIO_CONFIG.horaFin).padStart(2, "0");
      return res.status(400).json({
        error: `Solo se permiten horas entre ${horaInicio}:00 y ${horaFin}:00`,
      });
    }

    // Validar intervalo de minutos
    if (minutoNum % HORARIO_CONFIG.intervalo !== 0) {
      return res.status(400).json({
        error: `Solo en intervalos de ${HORARIO_CONFIG.intervalo} minutos`,
      });
    }

    // Si llegó aquí, todo es válido
    next();
  } catch (error) {
    res.status(500).json({
      error: "Error al validar horario",
      details: error.message,
    });
  }
};