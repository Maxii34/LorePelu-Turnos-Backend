import mongoose from "mongoose";
import { CATEGORIA_SERVICIO } from "../constants/turno.constants.js";

const servicioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
      enum: CATEGORIA_SERVICIO,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    duracionMin: {
      type: Number,
      required: true,
      min: 1,
      max: 480, // 8 horas máximo
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Servicio", servicioSchema);
