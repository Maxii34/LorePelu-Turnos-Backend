import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validarAdmin = [
  body("nombreCompleto")
    .trim()
    .notEmpty()
    .withMessage("El nombre completo es obligatorio")
    .isString()
    .withMessage("El nombre completo debe ser una cadena de texto")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre completo debe tener entre 3 y 100 caracteres"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  body("telefono")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[0-9\s-]{7,15}$/)
    .withMessage("El teléfono no es válido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isString()
    .withMessage("La contraseña debe ser una cadena de texto")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),

  body("rol")
    .optional()
    .isIn(["administrador", "moderador"])
    .withMessage("El rol debe ser 'administrador' o 'moderador'"),

  (req, res, next) => resultadoValidacion(req, res, next),
];
