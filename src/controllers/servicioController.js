import servicioService from "../services/servicioService.js";
import subirImagenCloudinary from "../helpers/cloudinaryUploader.js";
import cloudinary from "../helpers/cloudinary.js";

const procesarDuracion = (req) => {
  if (req.body && req.body.duracion) {
    const { horas = 0, minutos = 0 } = req.body.duracion;
    req.body.duracionMin = horas * 60 + minutos;
    delete req.body.duracion;
  }
};

const crearServicio = async (req, res) => {
  let imagenSubida = null;

  try {
    procesarDuracion(req);

    if (req.file) {
      imagenSubida = await subirImagenCloudinary(req.file.buffer);
      req.body.imagen = {
        url: imagenSubida.secure_url,
        public_id: imagenSubida.public_id,
      };
    }

    const servicioCreado = await servicioService.crearServicio(req.body);

    res.status(201).json({
      ok: true,
      mensaje: "Servicio creado correctamente",
      servicio: servicioCreado,
    });
  } catch (error) {
    // Si la imagen se subió pero el servicio no se pudo crear (ej: falla de validación),
    // borramos la imagen para no dejar basura en Cloudinary
    if (imagenSubida?.public_id) {
      await cloudinary.uploader.destroy(imagenSubida.public_id).catch(() => {});
    }

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
  let imagenSubida = null;

  try {
    procesarDuracion(req);

    if (req.file) {
      // Traemos el servicio actual para saber si tiene imagen vieja que borrar
      const servicioActual = await servicioService.obtenerServicio(
        req.params.id,
      );
      const publicIdAnterior = servicioActual?.imagen?.public_id;

      imagenSubida = await subirImagenCloudinary(req.file.buffer);
      req.body.imagen = {
        url: imagenSubida.secure_url,
        public_id: imagenSubida.public_id,
      };

      // Borramos la imagen anterior recién después de subir la nueva con éxito
      if (publicIdAnterior) {
        await cloudinary.uploader.destroy(publicIdAnterior).catch(() => {});
      }
    }

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
    // Si subimos imagen nueva pero la actualización del servicio falló, la borramos
    if (imagenSubida?.public_id) {
      await cloudinary.uploader.destroy(imagenSubida.public_id).catch(() => {});
    }

    res.status(500).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const eliminarServicio = async (req, res) => {
  try {
    const servicioEliminado = await servicioService.eliminarServicio(
      req.params.id,
    );

    if (servicioEliminado?.imagen?.public_id) {
      await cloudinary.uploader
        .destroy(servicioEliminado.imagen.public_id)
        .catch(() => {});
    }

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
