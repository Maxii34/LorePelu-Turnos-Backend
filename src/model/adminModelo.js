import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "El email no es válido",
    },
  },
  telefono: {
    optional: true,
    type: String,
    trim: true,
    match: [/^\+?[0-9\s-]{7,15}$/, "El teléfono no es válido"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [8, "La contraseña debe tener al menos 8 caracteres"],
  },
  rol: {
    type: String,
    enum: ["admin", "moderador", "superadmin"],
    default: "admin",
  },
});

export default mongoose.model("Admin", adminSchema);
