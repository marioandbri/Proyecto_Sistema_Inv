import express from "express";
const app = express();
import morgan from "morgan";
import path from "path";
import "regenerator-runtime/runtime";
const compression = require("compression");
import { sessionMiddleware } from "./session";
import passport from "passport";
import AuthPassport from "./config/passport";
import cookieParser from "cookie-parser";

// Settings
app.set("port", process.env.PORT || 4000);

//Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(sessionMiddleware);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
AuthPassport(passport);

//Globals
const routes = [
	require("./routes/tipoproducto.routes.js"),
	require("./routes/movimientos.routes.js"),
	require("./routes/productos.routes.js"),
	require("./routes/inventario.mdb.routes.js"),
	require("./routes/uac.routes.js"),
	require("./routes/empresa.routes.js"),
];
routes.forEach((e) => {
	app.use(e.default);
});

//Static Files
app.use(express.static(path.join(__dirname, "public")));
app.get("*", function (req, res) {
	res.sendFile("index.html", { root: path.join(__dirname, "../src/public/") });
});

//Exports
export default app;
