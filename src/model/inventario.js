import Sequelize from 'sequelize';
import { sequelize } from '../sequelize';

const Inventario = sequelize.define('inventario', {
   serialnumber: {
      type: Sequelize.TEXT,
      primaryKey: true
   },
   partnumber: {
      type: Sequelize.TEXT
   },
   rut_tenedor: {
      type: Sequelize.TEXT,

   },
   fecha_evento: {
      type: Sequelize.TEXT
   },
   rut_proveedor: {
      type: Sequelize.TEXT,
   },
   fecha_compra: {
      type: Sequelize.DATEONLY,
   },
   factura: {
      type: Sequelize.TEXT,
   },
   estado: {
      type: Sequelize.TEXT
   }
},
   {
      timestamps: true,
      updatedAt: 'updatedat',
      tableName: 'inventario'
   });

// Cliente.sync({ force: true }).then(console.log('modelo Cliente actualizado'));
Inventario.sync({ force: true })
export default Inventario;