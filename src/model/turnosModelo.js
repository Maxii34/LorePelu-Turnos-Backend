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
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
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
    mensaje: {
      type: String,
      trim: true,
      maxlength: 250,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Turno", turnoSchema);
