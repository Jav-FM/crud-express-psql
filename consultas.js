//Conexion con base de datos
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "canales",
  port: 5432,
});

//Consultas SQL

//Creacion de canal
const nuevoCanal = async (canal) => {
  try {
    const result = await pool.query(
      `INSERT INTO canales (nombre) values ('${canal}') RETURNING *`
    );
    return result.rows;
  } catch (e) {
    return e;
  }
};

//Traer canales
const getCanales = async () => {
  try {
    const result = await pool.query("SELECT * from canales");
    return result.rows;
  } catch (e) {
    return e;
  }
};

//Editar canal
const editCanal = async (id, nuevoNombre) => {
  try {
    const res = await pool.query(
      `UPDATE canales SET nombre = '${nuevoNombre}' WHERE id = '${id}' RETURNING *`
    );
    return res.rows;
  } catch (e) {
    return e;
  }
};

//Eliminar canal
const deleteCanal = async (id) => {
  try {
    const res = await pool.query(`DELETE FROM canales WHERE id = '${id}'`);
    return res.rowCount;
  } catch (e) {
    return e;
  }
};

//Exporto mis funciones
module.exports = { nuevoCanal, getCanales, editCanal, deleteCanal };
