import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema(
  {
    nombreCliente: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    servicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servicio",
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    hora: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmado", "cancelado", "completado"],
      default: "pendiente",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Turno", turnoSchema);
