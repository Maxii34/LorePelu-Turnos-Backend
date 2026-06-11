import jwt from "jsonwebtoken";

export const validarToken = (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    const authHeader = req.header("Authorization");

    if (!token && authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }

    if (!token) {
      return res.status(401).json({
        mensaje: "Token no proporcionado",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload.id;
    req.rol = payload.rol;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        mensaje: "El token ha expirado",
      });
    }

    return res.status(401).json({
      mensaje: "Token inválido",
    });
  }
};
