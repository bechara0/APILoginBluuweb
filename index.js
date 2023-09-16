const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// capturar body
app.use(express.json());

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DBNAME}.tgrezir.mongodb.net/?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(uri, options)
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));

// import routes
const authRoutes = require("./routes/auth");
const validaToken = require("./routes/validate-token");
const admin = require("./routes/admin");

// route middlewares
app.use("/api/user", authRoutes);

app.use("/api/admin", validaToken, admin);

app.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "funciona!",
  });
});

// iniciar server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
