import servicioService from "../services/servicioService.js";

const crearServicio = async (req, res) => {
  try {
    const servicioCreado = await servicioService.crearServicio(req.body);

    res.status(201).json({
      ok: true,
      mensaje: "Servicio creado correctamente",
      servicio: servicioCreado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const obtenerServicio = async (req, res) => {
  try {
    const servicioObtenido = await servicioService.obtenerServicio(
      req.params.id,
    );
    res.status(200).json({
      ok: true,
      mensaje: "Servicio obtenido",
      servicio: servicioObtenido,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const obtenerServicios = async (req, res) => {
  try {
    const serviciosObtenido = await servicioService.obtenerServicios();
    res.status(200).json({
      ok: true,
      mensaje: "Servicios Obetnidos",
      servicio: serviciosObtenido,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const actualizarServicio = async (req, res) => {
  try {
    const servicioActualizado = await servicioService.actualizarServicio(
      req.params.id,
      req.body,
    );
    console.log(req.body)
    res.status(200).json({
      ok: true,
      mensaje: "Servicio Actualizado",
      servicio: servicioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

export default {
  crearServicio,
  obtenerServicio,
  obtenerServicios,
  actualizarServicio,
};
