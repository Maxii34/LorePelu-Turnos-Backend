import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validarAdmin = [
  body("nombreCompleto")
    .trim()
    .notEmpty()
    .withMessage("El nombre completo es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre completo debe tener entre 3 y 100 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

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
    .matches(/^\+?[0-9]{7,15}$/)
    .withMessage("El teléfono debe tener entre 7 y 15 dígitos"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)",
    ),

  body("rol")
    .optional()
    .isIn(["administrador", "moderador"])
    .withMessage("El rol debe ser 'administrador' o 'moderador'"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

// Validación específica para login — solo email y password
export const validarLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),

  (req, res, next) => resultadoValidacion(req, res, next),
];
