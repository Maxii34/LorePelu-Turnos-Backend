// validarServicio.js
import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import { CATEGORIA_SERVICIO } from "../constants/turno.constants.js";

export const validarServicio = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del servicio es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-]+$/)
    .withMessage("El nombre solo puede contener letras, números, espacios y guiones"),

  body("categoria")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isIn(CATEGORIA_SERVICIO)
    .withMessage(`La categoría debe ser una de las siguientes: ${CATEGORIA_SERVICIO.join(", ")}`),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0, max: 999999 })
    .withMessage("El precio debe ser un número positivo y menor a 999.999"),

  body("duracion")
    .notEmpty().withMessage("La duración es obligatoria")
    .isObject().withMessage("La duración debe ser un objeto con horas y minutos."),

  body("duracion.horas")
    .optional({ checkFalsy: true })
    .isInt({ min: 0, max: 8 })
    .withMessage("Las horas deben ser un número entero entre 0 y 8"),

  body("duracion.minutos")
    .optional({ checkFalsy: true })
    .isInt({ min: 0, max: 59 })
    .withMessage("Los minutos deben ser un número entero entre 0 y 59"),

  body("duracion").custom((value) => {
    const { horas = 0, minutos = 0 } = value;
    const totalMinutos = horas * 60 + minutos;
    if (totalMinutos <= 0) {
      throw new Error("La duración total debe ser de al menos 1 minuto.");
    }
    if (totalMinutos > 480) {
      throw new Error("La duración total no puede exceder las 8 horas (480 minutos).");
    }
    return true;
  }),

  body("activo")
    .optional()
    .isBoolean()
    .withMessage("El campo activo debe ser verdadero o falso"),

  (req, res, next) => resultadoValidacion(req, res, next),
];