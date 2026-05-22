import bcrypt from "bcrypt";
import adminRepository from "../repositories/adminRepository.js";
import { generadorJWT } from "../middlewares/generadorToken.js";

const registrar = async ({
  nombreCompleto,
  email,
  telefono,
  password,
  rol,
}) => {
  // Verificar si ya existe un administrador con el mismo email
  const existe = await adminRepository.obtenerPorEmail(email);
  if (existe) {
    throw new Error("Ya existe un administrador con ese email");
  }
  // Hashear la contraseña antes de guardarla en la base de datos
  const passwordHasheada = await bcrypt.hash(password, 10);
  // Crear el nuevo administrador
  const admin = await adminRepository.crear({
    nombreCompleto,
    email,
    telefono,
    password: passwordHasheada,
    rol,
  });
  return admin;
};

// Función para iniciar sesión y generar un token JWT
const login = async ({ email, password }) => {
  // Buscar el administrador por email
  const admin = await adminRepository.obtenerPorEmail(email);
  if (!admin) {
    throw new Error("Email o contraseña incorrectos");
  }
  // Verificar la contraseña utilizando bcrypt
  const passwordValida = await bcrypt.compare(password, admin.password);
  if (!passwordValida) {
    throw new Error("Email o contraseña incorrectos");
  }
  // Generar un token JWT con la información del administrador
  const token = generadorJWT(admin._id, admin.rol);

  return {
    token,
    admin: {
      id: admin._id,
      nombreCompleto: admin.nombreCompleto,
      email: admin.email,
      rol: admin.rol,
    },
  };
};

// Función para obtener todos los administradores
const obtenerTodos = async () => {
  return await adminRepository.obtenerTodos();
};

// Función para obtener un administrador por su ID
const obtenerPorId = async (id) => {
  const admin = await adminRepository.obtenerPorId(id);
  if (!admin) throw new Error("Administrador no encontrado");
  return admin;
};

// Función para actualizar un administrador
const actualizar = async (id, datos) => {
  // Si se proporciona una nueva contraseña, se hashearla antes de actualizar
  if (datos.password) {
    datos.password = await bcrypt.hash(datos.password, 10);
  }
  // Actualizar el administrador en la base de datos
  const admin = await adminRepository.actualizar(id, datos);
  if (!admin) throw new Error("Administrador no encontrado");
  return admin;
};

const eliminar = async (id) => {
  // verificar que existe
  const admin = await adminRepository.obtenerPorId(id)
  if (!admin) throw new Error('Administrador no encontrado')

  // si es administrador, verificar que no sea el último
  if (admin.rol === 'administrador') {
    const totalAdmins = await adminRepository.contarPorRol('administrador')
    if (totalAdmins <= 1) {
      throw new Error('No se puede eliminar el único administrador del sistema')
    }
  }

  // si pasó las reglas, eliminar
  await adminRepository.eliminar(id)
  return admin
}

export default {
  registrar,
  login,
  obtenerTodos,
  obtenerPorId,
  actualizar,
  eliminar,
};
