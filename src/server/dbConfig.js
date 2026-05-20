import mongoose from "mongoose";

try {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.info("Conecion a la base de datos establecida.")
    })
} catch (error) {
    console.error("Error al conectar a la base de datos:", error)
}