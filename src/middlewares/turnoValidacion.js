// turnoValidacion.js
import { body } from "express-validator";
import { ESTADOS_TURNO } from "../constants/turno.constants.js";
import resultadoValidacion from "./resultadoValidacion.js";

export const turnoValidacion = [
  body("nombreCliente")
    .trim()
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

  body("telefono")
    .trim()
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .matches(/^\+?[0-9]{7,15}$/)
    .withMessage("El teléfono debe tener entre 7 y 15 dígitos"),

  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  body("servicio")
    .notEmpty()
    .withMessage("El servicio es obligatorio")
    .isMongoId()
    .withMessage("El ID del servicio no es válido"),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener formato válido (ej. 2025-12-31)")
    .custom((v) => {
      if (new Date(v) < new Date().setHours(0, 0, 0, 0)) {
        throw new Error("La fecha no puede ser en el pasado");
      }
      return true;
    }),

  body("hora")
    .trim()
    .notEmpty()
    .withMessage("La hora es obligatoria")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("La hora debe tener formato HH:MM (ej. 14:30)"),

  body("estado")
    .optional()
    .isIn(ESTADOS_TURNO)
    .withMessage(`El estado debe ser uno de: ${ESTADOS_TURNO.join(", ")}`),

  (req, res, next) => resultadoValidacion(req, res, next),
];