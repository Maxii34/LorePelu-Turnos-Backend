import mongoose from "mongoose";

const mongoUri = process.env.MONGODB;

if (!mongoUri) {
  console.error("Error: la variable de entorno MONGODB no está definida.");
} else {
  mongoose.connect(mongoUri)
    .then(() => console.info("Conexión a la base de datos establecida."))
    .catch((error) => console.error("Error al conectar a la base de datos:", error));
}
