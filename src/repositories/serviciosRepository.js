import servicio from "../model/serviciosModelo";

const crearServicio = async (servicioData) => {
  return await servicio.create(servicioData);
};

const obtenerServicio = async (id) => {
  return await servicio.find(id);
};

const obtenerServicios = async () => {
  return await servicio.find();
};

const actualizarServicio = async (id, servicioData) => {
  return await servicio.findByIdAndUpdate(id, servicioData, {
    returnDocument: "after",
  });
};

const eliminarServicoo = async (id) => {
  return await servicio.findByIdAndDelete(id);
};
