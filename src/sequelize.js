import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize(
   'postgres',
   'postgres',
   'h0landa3028',
   {
      host: '192.168.1.162',
      dialect: 'postgres',
      pool:{
         max: 5,
         min: 0,
         require: 30000,
         idle: 10000
      },
      logging: false
   }
);
