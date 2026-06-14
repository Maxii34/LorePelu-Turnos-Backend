import serviciosRepository from "../repositories/serviciosRepository.js";

const crearServicio = async (servicioData) => {
  const { nombre, precio } = servicioData;
  if (!nombre && !precio) {
    throw new Error("Faltan datos obligatorios");
  }
  const crearServicio = await serviciosRepository.crearServicio(servicioData);
  return crearServicio;
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
    return await servicioRepository.obtenerServicios();
  }

  return await servicioRepository.buscarServicios(texto);
};

export default {
  crearServicio,
  obtenerServicio,
  obtenerServicios,
  actualizarServicio,
  eliminarServicio,
  buscarServicios,
};
