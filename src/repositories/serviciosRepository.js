import servicio from "../model/serviciosModelo.js";

const crearServicio = async (servicioData) => {
  return await servicio.create(servicioData);
};

const obtenerServicio = async (id) => {
  return await servicio.findById(id);
};

const obtenerServicios = async () => {
  return await servicio.find();
};

const actualizarServicio = async (id, servicioData) => {
  return await servicio.findByIdAndUpdate(id, servicioData, {
    returnDocument: "after",
  });
};

const eliminarServico = async (id) => {
  return await servicio.findByIdAndDelete(id);
};

export default {
  crearServicio,
  obtenerServicio,
  obtenerServicios,
  actualizarServicio,
  eliminarServico,
};
