import express from "express";
const app = express();
import morgan from "morgan";
import path from "path";
import "regenerator-runtime/runtime";
const compression = require("compression");
import { sessionMiddleware } from "./session";
import passport from 'passport'
import AunthPassport from './config/passport'
import cookieParser from 'cookie-parser'
// const bodyParser = require('body-parser')

// Settings
app.set("port", process.env.PORT || 4000);

//Middleware
app.use(morgan("tiny"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(sessionMiddleware);
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(passport.initialize())
app.use(passport.session())
AunthPassport(passport)

// app.use((req, res, next) => {
//   console.log(req.session)
//   console.log(req.user)
//   next()
// })
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
app.use(require("./routes/uac.routes.js"))

//Static Files
app.use(express.static(path.join(__dirname, "public")));
app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../src/public/") });
});

//Exports
export default app;
