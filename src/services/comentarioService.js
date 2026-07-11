import comentarioRepositorio from "../repositories/comentarioRepositorio.js";

const crearComentario = async (data) => {
  const { usuario, nombreUsuario, comentario, estrellas } = data;

  if (!usuario || !nombreUsuario || !comentario || !estrellas) {
    throw new Error("Faltan datos obligatorios");
  }

  const nuevoComentario = await comentarioRepositorio.crearComentario(data);
  return nuevoComentario;
};

const obtenerComentarios = async () => {
  return await comentarioRepositorio.obtenerComentarios();
};

const obtenerComentario = async (id) => {
  const encontrado = await comentarioRepositorio.obtenerComentario(id);
  if (!encontrado) throw new Error("Comentario no encontrado");
  return encontrado;
};

// Baja lógica: no elimina físicamente, desactiva
const desactivarComentario = async (id) => {
  const encontrado = await comentarioRepositorio.obtenerComentario(id);
  if (!encontrado) throw new Error("Comentario no encontrado");
  return await comentarioRepositorio.desactivarComentario(id);
};

const actualizarComentario = async (id, data) => {
  const encontrado = await comentarioRepositorio.obtenerComentario(id);
  if (!encontrado) throw new Error("Comentario no encontrado");
  return await comentarioRepositorio.actualizarComentario(id, data);
};

export default {
  crearComentario,
  obtenerComentarios,
  obtenerComentario,
  desactivarComentario,
  actualizarComentario,
};