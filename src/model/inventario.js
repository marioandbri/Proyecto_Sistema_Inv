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

const somePromise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("whatever");
    }, 500);
  });

const Inventario = sequelize.define(
  "inventario",
  {
    numeroSerie: {
      type: Sequelize.TEXT,
      primaryKey: true,
    },
    productPN: {
      type: Sequelize.TEXT,
      // get() {
      //   return (async () => {
      //     console.log("begin calling");
      //     const getDes = async () => {
      //       let description = "";
      //       const rawValue = this.getDataValue("productPN");
      //       console.log("async fn");
      //       const descr = Productos.findOne({
      //         partnumber: rawValue,
      //       })
      //         .exec()
      //         .then((data) => {
      //           return data?.DescriptionL;
      //         });
      //       const result = await descr;
      //       description = `${rawValue} - ${result}`;
      //       return description;
      //     };
      //     const fulldescr = getDes();
      //     console.log(await fulldescr);
      //     console.log("finish calling");
      //     return await fulldescr;
      //   })();
      // },
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
