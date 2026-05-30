import Comentario from "../model/comentarioModelo.js";

const crearComentario = async (data) => {
  return await Comentario.create(data);
};

const obtenerComentarios = async () => {
  return await Comentario.find({ activo: true })
    .populate("usuario", "nombreUsuario fotoPerfil") // trae datos del usuario relacionado
    .sort({ createdAt: -1 }); // los más recientes primero
};

const obtenerComentario = async (id) => {
  return await Comentario.findById(id)
    .populate("usuario", "nombreUsuario fotoPerfil");
};

const actualizarComentario = async (id, data) => {
  return await Comentario.findByIdAndUpdate(id, data, { new: true });
};

const desactivarComentario = async (id) => {
  return await Comentario.findByIdAndUpdate(
    id,
    { activo: false },
    { new: true }
  );
};

export default {
  crearComentario,
  obtenerComentarios,
  obtenerComentario,
  actualizarComentario,
  desactivarComentario,
};