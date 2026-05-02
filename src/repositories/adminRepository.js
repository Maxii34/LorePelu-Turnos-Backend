import Admin from "../model/adminModelo.js";

const crear = async (adminData) => {
  return await Admin.create(adminData);
};

const obtenerTodos = async () => {
  return await Admin.find().select("-password");
};

const obtenerPorId = async (id) => {
  return await Admin.findById(id).select("-password");
};

const obtenerPorEmail = async (email) => {
  return await Admin.findOne({ email });
};

// ✅ lo que necesitás — devuelve un número
const contarPorRol = async (rol) => {
  return await Admin.countDocuments({ rol })
};

const actualizar = async (id, adminData) => {
  return await Admin.findByIdAndUpdate(id, adminData, { returnDocument: "after" }).select("-password");
};

const eliminar = async (id) => {
  return await Admin.findByIdAndDelete(id)
};

export default { crear, obtenerTodos, obtenerPorId, obtenerPorEmail, contarPorRol, actualizar, eliminar };