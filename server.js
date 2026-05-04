const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la Base de Datos (Se configurará por variables de entorno en Docker)
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "db",
  database: process.env.DB_NAME || "innovatech",
  password: process.env.DB_PASSWORD || "admin123",
  port: 5432,
});

app.get("/api/status", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "¡Conectado al Backend y a la BD exitosamente!", db_time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: "Error conectando a la Base de Datos", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend corriendo en el puerto ${PORT}`));
