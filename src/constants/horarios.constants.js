/**
 * Configuración centralizada de días y horas disponibles
 */

export const HORARIO_CONFIG = {
  // Días permitidos (0 = domingo, 1 = lunes, ..., 6 = sábado)
  diasPermitidos: [1, 2, 3, 4, 5, 6], // Lunes a viernes
  
  // Rango de horas (formato 24h)
  horaInicio: 9,    // 09:00
  horaFin: 19,      // 19:00
  
  // Intervalos de horas disponibles (en minutos)
  intervalo: 30,    // Cada 30 minutos
  
  // Fechas específicas NO permitidas (ej. días festivos)
  fechasNoPermitidas: [
    "2024-12-25", // Navidad
    "2024-01-01", // Año nuevo
    // Agregar más según sea necesario
  ],
};

export const nombresDias = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miércoles",
  4: "jueves",
  5: "viernes",
  6: "sábado",
};

/**
 * Valida si una fecha es permitida
 */
export const esDatePermitida = (fechaString) => {
  const fecha = new Date(fechaString);
  const diaSemana = fecha.getDay();
  
  // Verificar que sea un día permitido
  if (!HORARIO_CONFIG.diasPermitidos.includes(diaSemana)) {
    return {
      valido: false,
      mensaje: `Solo se permiten: ${HORARIO_CONFIG.diasPermitidos
        .map(d => nombresDias[d].charAt(0).toUpperCase() + nombresDias[d].slice(1))
        .join(", ")}`,
    };
  }
  
  // Verificar que no sea una fecha festiva
  if (HORARIO_CONFIG.fechasNoPermitidas.includes(fechaString)) {
    return {
      valido: false,
      mensaje: "Esta fecha no está disponible (día festivo)",
    };
  }
  
  return { valido: true };
};

/**
 * Valida si una hora es permitida
 */
export const esHoraPermitida = (horaString) => {
  const [horas, minutos] = horaString.split(":").map(Number);
  
  // Verificar rango de horas
  if (horas < HORARIO_CONFIG.horaInicio || horas >= HORARIO_CONFIG.horaFin) {
    return {
      valido: false,
      mensaje: `Solo entre ${String(HORARIO_CONFIG.horaInicio).padStart(2, "0")}:00 y ${String(HORARIO_CONFIG.horaFin).padStart(2, "0")}:00`,
    };
  }
  
  // Verificar que sea múltiplo del intervalo
  if (minutos % HORARIO_CONFIG.intervalo !== 0) {
    return {
      valido: false,
      mensaje: `Solo en intervalos de ${HORARIO_CONFIG.intervalo} minutos`,
    };
  }
  
  return { valido: true };
};

/**
 * Genera las horas disponibles para un día específico
 */
export const generarHorasDisponibles = () => {
  const horas = [];
  const { horaInicio, horaFin, intervalo } = HORARIO_CONFIG;
  
  for (let h = horaInicio; h < horaFin; h++) {
    for (let m = 0; m < 60; m += intervalo) {
      const hora = String(h).padStart(2, "0");
      const minuto = String(m).padStart(2, "0");
      horas.push(`${hora}:${minuto}`);
    }
  }
  
  return horas;
};

/**
 * Valida fecha y hora juntas
 */
export const esDateTimeValido = (fecha, hora) => {
  const validacionFecha = esDatePermitida(fecha);
  if (!validacionFecha.valido) return validacionFecha;
  
  const validacionHora = esHoraPermitida(hora);
  if (!validacionHora.valido) return validacionHora;
  
  return { valido: true };
};