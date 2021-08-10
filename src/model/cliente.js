import Sequelize from 'sequelize';
import { sequelize } from '../sequelize';

const Cliente = sequelize.define('cliente', {
   rut: {
      type: Sequelize.TEXT,
      primaryKey: true
   },
   razonsocial: {
      type: Sequelize.TEXT
   },
   ubicacion: {
      type: Sequelize.TEXT
   },
   contacto: {
      type: Sequelize.INTEGER
   }
},
   {
      createdAt: 'createdat',
      updatedAt: 'updatedat',
      tableName: 'clientes'
   });

export default Cliente;
