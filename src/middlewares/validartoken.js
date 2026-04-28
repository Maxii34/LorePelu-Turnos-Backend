import jwt from "jsonwebtoken";

const validarToken = (req, res, next) => {
  try {
    //Se busca el token en el header Authorization con formato "Bearer
    const authHeader = req.header("Authorization");
    let token;
    // Si el header existe y comienza con "Bearer ", se extrae el token
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7); // Remover "Bearer " del inicio
    }
    // Si no se encuentra el token, se devuelve un error 401
    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }
    // Verificar el token usando la clave secreta del entorno
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload.id;
    req.rol = payload.rol;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensaje: "El token ha expirado" });
    }
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};
