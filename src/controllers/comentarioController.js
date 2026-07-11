import comentarioService from "../services/comentarioService.js";

const crearComentario = async (req, res) => {
  try {
    const comentarioCreado = await comentarioService.crearComentario(req.body);
    res.status(201).json({
      ok: true,
      mensaje: "Comentario creado correctamente",
      comentario: comentarioCreado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const obtenerComentarios = async (req, res) => {
  try {
    const comentariosObtenidos = await comentarioService.obtenerComentarios();
    res.status(200).json({
      ok: true,
      mensaje: "Comentarios obtenidos",
      comentarios: comentariosObtenidos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const obtenerComentario = async (req, res) => {
  try {
    const comentarioObtenido = await comentarioService.obtenerComentario(req.params.id);
    res.status(200).json({
      ok: true,
      mensaje: "Comentario obtenido",
      comentario: comentarioObtenido,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const actualizarComentario = async (req, res) => {
  try {
    const comentarioActualizado = await comentarioService.actualizarComentario(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      ok: true,
      mensaje: "Comentario actualizado",
      comentario: comentarioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const desactivarComentario = async (req, res) => {
  try {
    const comentarioDesactivado = await comentarioService.desactivarComentario(req.params.id);
    res.status(200).json({
      ok: true,
      mensaje: "Comentario desactivado correctamente",
      comentario: comentarioDesactivado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export default {
  crearComentario,
  obtenerComentarios,
  obtenerComentario,
  actualizarComentario,
  desactivarComentario,
};