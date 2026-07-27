import serviciosRepository from "../repositories/serviciosRepository.js";

const crearServicio = async (servicioData) => {
  const nuevoServicio = await serviciosRepository.crearServicio(servicioData); 
  return nuevoServicio;
};

const obtenerServicio = async (id) => {
  return await serviciosRepository.obtenerServicio(id);
};

const obtenerServicios = async () => {
  return await serviciosRepository.obtenerServicios();
};

const actualizarServicio = async (id, servicioData) => {
  const servicioEncontrado = await serviciosRepository.obtenerServicio(id);
  if (!servicioEncontrado) throw new Error("Servicio no encontrado");
  return await serviciosRepository.actualizarServicio(id, servicioData);
};

const eliminarServicio = async (id) => {
  const servicioEncontrado = await serviciosRepository.obtenerServicio(id);
  if (!servicioEncontrado) throw new Error("Servicio no encontrado");
  return await serviciosRepository.eliminarServico(id);
};

const buscarServicios = async (texto) => {
  if (!texto?.trim()) {
    return await serviciosRepository.obtenerServicios();
  }

  return await serviciosRepository.buscarServicios(texto);
};

export default {
  crearServicio,
  obtenerServicio,
  obtenerServicios,
  actualizarServicio,
  eliminarServicio,
  buscarServicios,
};
