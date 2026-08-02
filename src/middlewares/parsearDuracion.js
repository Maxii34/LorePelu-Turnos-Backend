export const parsearDuracion = (req, res, next) => {
  if (req.body.duracion) {
    try {
      req.body.duracion = JSON.parse(req.body.duracion);
    } catch {
      return res.status(400).json({
        ok: false,
        mensaje: "El formato de duración es inválido.",
      });
    }
  }

  next();
};
