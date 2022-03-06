//Servidor
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server ON");
});

//Endpoints

//Me traigo las funciones para consultas de Postgres
const {
  nuevoCanal,
  getCanales,
  editCanal,
  deleteCanal,
} = require("./consultas");

//Create
app.post("/canal", async (req, res) => {
  const { nombre } = req.body;
  const respuesta = await nuevoCanal(nombre);
  res.send(respuesta);
});

//Read
app.get("/canales", async (req, res) => {
  const respuesta = await getCanales();
  res.send(respuesta);
});

//Edit
app.put("/canal/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const respuesta = await editCanal(id, nombre);
  res.send(respuesta);
});

//Delete
app.delete("/canal/:id", async (req, res) => {
  const { id } = req.params;
  const respuesta = await deleteCanal(id);
  respuesta > 0
    ? res.send(`El canal con id ${id} se eliminó con éxito`)
    : res.send(`No existe un canal con id ${id}`);
});
