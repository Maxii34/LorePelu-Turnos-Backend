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

const actualizar = async (id, adminData) => {
  return await Admin.findByIdAndUpdate(id, adminData, { new: true }).select("-password",);
};

const eliminar = async (id) => {
  return await Admin.findByIdAndDelete(id)
};

export default { crear, obtenerTodos, obtenerPorId, obtenerPorEmail, actualizar, eliminar };