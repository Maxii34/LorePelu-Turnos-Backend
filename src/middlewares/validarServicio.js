import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validarServicio = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del servicio es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número positivo"),

  body("duracionMin")
    .notEmpty()
    .withMessage("La duración mínima es obligatoria")
    .isInt({ min: 1 })
    .withMessage("La duración debe ser un número entero positivo (minutos)"),

  body("activo")
    .optional()
    .isBoolean()
    .withMessage("El estado activo debe ser un valor booleano"),

  (req, res, next) => resultadoValidacion(req, res, next),
];
