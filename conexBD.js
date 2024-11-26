const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/redeban", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

app.use(bodyParser.json());

const formularioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
});

const Formulario = mongoose.model("collectionRedeban", formularioSchema);

app.post("/api/formulario", async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoFormulario = new Formulario({ nombre, email, mensaje });
    await nuevoFormulario.save();

    res.status(201).json({ message: "Formulario guardado exitosamente", data: nuevoFormulario });
  } catch (error) {
    console.error("Error al guardar el formulario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
