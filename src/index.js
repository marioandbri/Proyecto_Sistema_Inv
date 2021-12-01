require("dotenv").config();
require("@babel/register")({});
const app = require("./server").default;
require("./database");
require("./session");

const { sequelize } = require("./sequelize.js");

//Server is listening
app.listen(app.get("port"), () => {
  console.log("Server en puerto", app.get("port"));
  sequelize
    .authenticate()
    .then(() => {
      console.log("Postgres connected...");
    })
    .catch((e) => {
      console.log("No se ha podido conectar a postgres", e);
    });
});

console.log(process.env.NODE_ENV);
