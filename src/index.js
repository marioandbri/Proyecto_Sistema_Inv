require("dotenv").config();
require("@babel/register")({});

const app = require("./server").default;
require("./database");
require("./session");

app.listen(app.get("port"), () => {
	console.log("Server en puerto", app.get("port"));
});

console.log(process.env.NODE_ENV);
