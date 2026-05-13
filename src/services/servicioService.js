import serviciosRepository from "../repositories/serviciosRepository";

const crearServicio = async (servicioData) => {
  const { nombre, precio } = servicioData;
  if (!nombre && !precio) {
    throw new Error("Faltan datos obligatorios");
  }
  const crearServicio = await serviciosRepository.crearServicio(servicioData);
  return crearServicio;
};

export default { crearServicio };
