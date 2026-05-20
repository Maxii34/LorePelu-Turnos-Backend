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
    },
    rol: {
      type: String,
      enum: ["administrador", "moderador"],
      default: "administrador",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);