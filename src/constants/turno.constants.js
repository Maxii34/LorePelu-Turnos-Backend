export const ESTADOS_TURNO = [
  "pendiente",
  "confirmado",
  "cancelado",
  "completado",
];

export const ESTADOS_TURNO_ACTIVOS = ["pendiente", "confirmado"];

export const ESTADO_DEFAULT = "pendiente";

export const esEstadoTurnoActivo = (estado) =>
  ESTADOS_TURNO_ACTIVOS.includes(estado);

export const CATEGORIA_SERVICIO = [
  "cortes",
  "coloracion",
  "unas",
  "estetica",
  "maquillaje",
  "pedicura",
  "depilacion",
];
