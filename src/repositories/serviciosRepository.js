import { populate } from "dotenv";
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

const buscarServicios = async (texto) => {
  const filtro = {
    $or: [
      {
        nombre: {
          $regex: texto,
          $options: "i",
        },
      },
      {
        categoria: {
          $regex: texto,
          $options: "i",
        },
      },
    ],
  };

  const textoLower = texto.toLowerCase();

  if (textoLower.includes("activo") && !textoLower.includes("inactivo")) {
    filtro.$or.push({ activo: true });
  }

  if (textoLower.includes("inactivo") || textoLower.includes("desactivado")) {
    filtro.$or.push({ activo: false });
  }

  return await Servicio.find(filtro).sort({
    categoria: 1,
    nombre: 1,
  });
};

export default {
  crearServicio,
  obtenerServicio,
  obtenerServicios,
  actualizarServicio,
  eliminarServico,
  buscarServicios,
};
