import adminService from "../services/adminService.js";
import subirImagenCloudinary from "../helpers/cloudinaryUploader.js";
import cloudinary from "../helpers/cloudinary.js";

const registrar = async (req, res) => {
  try {
    const admin = await adminService.registrar(req.body);
    res.status(201).json({ ok: true, mensaje: "Registro exitoso", admin });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, admin } = await adminService.login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // obligatorio en HTTPS (Vercel siempre es https)
      sameSite: "none", // necesario para que viaje cross-site
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      ok: true,
      token,
      mensaje: "Sesión iniciada exitosamente",
      admin,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      mensaje: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    ok: true,
    mensaje: "Sesión cerrada correctamente",
  });
};

const obtenerTodos = async (req, res) => {
  try {
    const admins = await adminService.obtenerTodos();
    res.status(200).json({
      ok: true,
      mensaje: "Administradores obtenidos exitosamente",
      admins,
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const admin = await adminService.obtenerPorId(req.params.id);
    res.status(200).json({
      ok: true,
      mensaje: "Administrador obtenido exitosamente",
      admin,
    });
  } catch (error) {
    res.status(404).json({ ok: false, mensaje: error.message });
  }
};

const obtenerPerfil = async (req, res) => {
  try {
    const admin = await adminService.obtenerPorId(req.usuario);
    res
      .status(200)
      .json({ ok: true, mensaje: "Perfil obtenido exitosamente", admin });
  } catch (error) {
    res.status(404).json({ ok: false, mensaje: error.message });
  }
};

const actualizarPerfil = async (req, res) => {
  let imagenSubida = null;

  try {
    if (req.file) {
      const adminActual = await adminService.obtenerPorId(req.usuario);
      const publicIdAnterior = adminActual?.fotoPerfil?.public_id;

      imagenSubida = await subirImagenCloudinary(req.file.buffer);
      req.body.fotoPerfil = {
        url: imagenSubida.secure_url,
        public_id: imagenSubida.public_id,
      };

      if (publicIdAnterior) {
        await cloudinary.uploader.destroy(publicIdAnterior).catch(() => {});
      }
    }

    const admin = await adminService.actualizar(req.usuario, req.body);
    res
      .status(200)
      .json({ ok: true, mensaje: "Perfil actualizado exitosamente", admin });
  } catch (error) {
    if (imagenSubida?.public_id) {
      await cloudinary.uploader.destroy(imagenSubida.public_id).catch(() => {});
    }
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

const eliminarPerfil = async (req, res) => {
  try {
    const adminActual = await adminService.obtenerPorId(req.usuario);

    await adminService.eliminar(req.usuario);

    if (adminActual?.fotoPerfil?.public_id) {
      await cloudinary.uploader
        .destroy(adminActual.fotoPerfil.public_id)
        .catch(() => {});
    }

    res
      .status(200)
      .json({ ok: true, mensaje: "Cuenta eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

const actualizar = async (req, res) => {
  try {
    const admin = await adminService.actualizar(req.params.id, req.body);
    res.status(200).json({
      ok: true,
      mensaje: "Administrador actualizado exitosamente",
      admin,
    });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const eliminarUsuario = await adminService.eliminar(req.params.id);
    res
      .status(200)
      .json({ ok: true, usuario: eliminarUsuario, mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(404).json({ ok: false, mensaje: error.message });
  }
};

export default {
  registrar,
  login,
  obtenerTodos,
  obtenerPorId,
  obtenerPerfil,
  actualizarPerfil,
  actualizar,
  eliminar,
  eliminarPerfil,
  logout,
};
