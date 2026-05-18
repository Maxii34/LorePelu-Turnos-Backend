import mongoose from "mongoose";
import { ESTADOS_TURNO, ESTADO_DEFAULT } from "../constants/turno.constants.js";

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
      enum: ESTADOS_TURNO,
      default: ESTADO_DEFAULT,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Turno", turnoSchema);
