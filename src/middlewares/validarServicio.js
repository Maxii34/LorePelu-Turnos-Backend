// validarServicio.js
import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validarServicio = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del servicio es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-]+$/)
    .withMessage("El nombre solo puede contener letras, números, espacios y guiones"),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0, max: 999999 })
    .withMessage("El precio debe ser un número positivo y menor a 999.999"),

  body("duracionMin")
    .notEmpty()
    .withMessage("La duración es obligatoria")
    .isInt({ min: 1, max: 480 })
    .withMessage("La duración debe ser entre 1 y 480 minutos (8 horas)"),

  body("activo")
    .optional()
    .isBoolean()
    .withMessage("El campo activo debe ser verdadero o falso"),

  (req, res, next) => resultadoValidacion(req, res, next),
];