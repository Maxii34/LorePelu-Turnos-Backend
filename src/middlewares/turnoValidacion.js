import { body } from "express-validator";
import { ESTADOS_TURNO } from "../constants/turno.constants.js";
import resultadoValidacion from "./resultadoValidacion.js";

export const turnoValidacion = [
  body("nombreCliente")
    .trim()
    .notEmpty().withMessage("El nombre del cliente es obligatorio")
    .isString().withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 2, max: 100 }).withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  body("telefono")
    .trim()
    .notEmpty().withMessage("El teléfono es obligatorio")
    .isString().withMessage("El teléfono debe ser válido")
    .isLength({ min: 8, max: 20 }).withMessage("El teléfono debe tener entre 8 y 20 caracteres"),

  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage("El email no es válido")
    .normalizeEmail(),

  body("servicio")
    .notEmpty().withMessage("El servicio es obligatorio")
    .isMongoId().withMessage("El ID del servicio no es válido"),

  body("fecha")
    .notEmpty().withMessage("La fecha es obligatoria")
    .isISO8601().withMessage("La fecha debe tener un formato válido"),

  body("hora")
    .trim()
    .notEmpty().withMessage("La hora es obligatoria")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("La hora debe tener formato HH:MM (ej. 14:30)"),

  body("estado")
    .optional()
    .isIn(ESTADOS_TURNO).withMessage(`El estado debe ser uno de los siguientes: ${ESTADOS_TURNO.join(", ")}`),

  resultadoValidacion
];
