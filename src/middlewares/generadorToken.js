import jwt from "jsonwebtoken";

export const generadorJWT = (id, rol) => {
  try {
    const payload = { id, rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });
    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    return null;
  }
};
