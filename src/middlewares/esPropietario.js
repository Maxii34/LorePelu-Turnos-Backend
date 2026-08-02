import comentarioRepositorio from "../repositories/comentarioRepositorio.js";

export const validoPropietario = async (req, res, next) => {
  try {
    const idComentario = req.params.id;
    const usuarioLogueado = req.usuario;

    if (!idComentario) {
      return res
        .status(400)
        .json({ mensaje: "No se especificó el comentario" });
    }

    if (!usuarioLogueado) {
      return res
        .status(401)
        .json({ mensaje: "Debes iniciar sesión para realizar esta acción" });
    }

    const comentario =
      await comentarioRepositorio.obtenerComentario(idComentario);

    if (!comentario) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }

    const propietarioComentario =
      comentario.usuario?._id?.toString() ?? comentario.usuario?.toString();
    const esPropietario = propietarioComentario === usuarioLogueado.toString();

    if (req.rol === "administrador" || esPropietario) {
      return next();
    }

    return res
      .status(403)
      .json({ mensaje: "No tienes permisos para modificar este comentario" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al validar la propiedad del comentario",
      error: error.message,
    });
  }
};
