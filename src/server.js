import express from "express";
const app = express();
import morgan from "morgan";
import path from "path";
import "regenerator-runtime/runtime";
// const bodyParser = require('body-parser')

// Settings
app.set("port", process.env.PORT || 4000);

//Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//Globals

app.use(require("./routes/ot.routes.js"));
app.use(require("./routes/cliente.routes.js"));
app.use(require("./routes/valida.routes.js"));
app.use(require("./routes/tipoproducto.routes.js"));
app.use(require("./routes/impresora.routes.js"));
app.use(require("./routes/computador.routes.js"));
app.use(require("./routes/monitor.routes.js"));
app.use(require("./routes/productos.routes.js"));
app.use(require("./routes/inventario.routes.js"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));
app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../src/public/") });
});

//Exports
export default app;
