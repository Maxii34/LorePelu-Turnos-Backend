import servicioService from "../services/servicioService";

const crearServicio = async (req, res) => {
  try {
    const servicioCreado = await servicioService.crearServicio(req.body);
    res.status(201).json({ ok: true, mensjae: error.message });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export default { crearServicio };