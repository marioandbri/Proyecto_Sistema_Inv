import Sequelize from "sequelize";
import { sequelize } from "../sequelize";

const Inventario = sequelize.define(
  "inventario",
  {
    numeroSerie: {
      type: Sequelize.TEXT,
      primaryKey: true,
    },
    productPN: {
      type: Sequelize.TEXT,
    },
    rutPoseedor: {
      type: Sequelize.TEXT,
    },
    fechaEvento: {
      type: Sequelize.TEXT,
    },
    rutProveedor: {
      type: Sequelize.TEXT,
    },
    fechaCompra: {
      type: Sequelize.DATEONLY,
    },
    nroFactura: {
      type: Sequelize.TEXT,
    },
    estado: {
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: true,
    updatedAt: "updatedat",
    tableName: "inventario",
  }
);

// Cliente.sync({ force: true }).then(console.log('modelo Cliente actualizado'));
Inventario.sync({ force: true });
export default Inventario;
