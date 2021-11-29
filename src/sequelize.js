import { Sequelize } from "sequelize";
const { PGSQL_SERVER } = process.env;

export const sequelize = new Sequelize("postgres", "postgres", "h0landa3028", {
  host: PGSQL_SERVER,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
  logging: false,
});
