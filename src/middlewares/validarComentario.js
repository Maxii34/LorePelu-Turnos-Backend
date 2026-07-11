import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionComentario = [
  body("usuario")
    .notEmpty().withMessage("El usuario es requerido")
    .isMongoId().withMessage("El usuario debe ser un ID válido de MongoDB"),

  body("nombreUsuario")
    .notEmpty().withMessage("El nombre de usuario es requerido")
    .isString().withMessage("El nombre de usuario debe ser texto")
    .trim()
    .isLength({ min: 2 }).withMessage("El nombre de usuario debe tener al menos 2 caracteres")
    .isLength({ max: 50 }).withMessage("El nombre de usuario no puede superar los 50 caracteres"),

  body("comentario")
    .notEmpty().withMessage("El comentario es requerido")
    .isString().withMessage("El comentario debe ser texto")
    .trim()
    .isLength({ min: 5 }).withMessage("El comentario debe tener al menos 5 caracteres")
    .isLength({ max: 500 }).withMessage("El comentario no puede superar los 500 caracteres"),

  body("estrellas")
    .notEmpty().withMessage("Las estrellas son requeridas")
    .isInt({ min: 1, max: 5 }).withMessage("Las estrellas deben ser un número entero entre 1 y 5"),

  body("activo")
    .optional()
    .isBoolean().withMessage("El campo activo debe ser un booleano"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionComentario;