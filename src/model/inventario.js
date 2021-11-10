import Sequelize from "sequelize";
import { sequelize } from "../sequelize";
import Productos from "./productos";
// const getDescription = async (pn) => {
//   console.log(pn);
//   let description = await Productos.findOne({ partnumber: pn })
//     .exec()
//     .then((data) => data?.DescriptionL);
//   // console.log(description);
//   return description;
// };

const Inventario = sequelize.define(
  "inventario",
  {
    numeroSerie: {
      type: Sequelize.TEXT,
      primaryKey: true,
    },
    productPN: {
      type: Sequelize.TEXT,
      allowNull: false,
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
Inventario.sync({ alter: true });
export default Inventario;
