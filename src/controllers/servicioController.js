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

const eliminarServicio = async (req, res) => {
  try {
    const servicioEliminado = await servicioService.eliminarServicio(req.params.id);
    res.status(200).json({
      ok: true,
      mensaje: "Servicio Eliminado",
      servicio: servicioEliminado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const buscarServicios = async (req, res) => {
  try {
    const { q } = req.query;

    const servicios = await servicioService.buscarServicios(q);

    res.status(200).json({
      ok: true,
      mensaje: "Servicios encontrados",
      servicios,
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
  eliminarServicio,
  buscarServicios,
};
