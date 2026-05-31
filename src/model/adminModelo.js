import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
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
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email no válido"],
    },
    telefono: {
      type: String,
      trim: true,
      match: [/^\+?[0-9\s-]{7,15}$/, "Teléfono no válido"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (v) {
          if (v.startsWith("$2b$") || v.startsWith("$2a$")) return true;
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        },
        message:
          "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)",
      },
    },
    rol: {
      type: String,
      enum: ["usuario", "administrador", "moderador"],
      default: "usuario",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);