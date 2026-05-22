import mongoose from "mongoose";
import { ESTADOS_TURNO, ESTADO_DEFAULT } from "../constants/turno.constants.js";

const turnoSchema = new mongoose.Schema(
  {
    nombreCliente: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
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
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    estado: {
      type: String,
      enum: ESTADOS_TURNO,
      default: ESTADO_DEFAULT,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Turno", turnoSchema);