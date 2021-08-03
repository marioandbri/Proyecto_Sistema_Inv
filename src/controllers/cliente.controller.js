import { Sequelize, QueryTypes } from 'sequelize';
import Cliente from '../model/cliente';
import { Op } from 'sequelize';

export async function createCliente(req, res) {
   const data_in = req.body;
   await Cliente.create(data_in);
   console.log(data_in);
   res.json({
      'message': 'Cliente creado satisfactoriamente',
      'data': data_in
   });
};

export async function getClienteByRut(req, res) {
   const rut = req.params.rut;
   console.log(rut);
   const result = await Cliente.findAll({
      where: {
         rut: rut
      }
   });
   console.log(result);
   res.json(result);

};

export async function getClienteByQuery(req, res) {
   const query = req.query;
   console.log(query);
   if (JSON.stringify(query) != "{}") {
      const queryvalues = JSON.stringify(query).match(/([\w]+)([\w\d\s\-]+)/g);
      const querystring = `SELECT * FROM clientes WHERE ${queryvalues[0]} ILIKE '%${queryvalues[1]}%'`;
      const result = await Cliente.sequelize.query(querystring, { type: QueryTypes.SELECT });
      res.json(result);
   } else {
      const result = await Cliente.findAll({});
      res.json(result);
   }

}

export async function updateCliente(req, res) {
   const rut = req.params.rut;
   const data_in = req.body;
   console.log(rut);
   console.log(data_in);
   const result = await Cliente.update(data_in, {
      where: {
         rut: rut
      }
   });
   console.log(result);
   res.json({ result });

}

export async function deleteCliente(req, res) {
   const rut = req.params.rut;
   console.log(rut);
   const result = await Cliente.destroy({
      where: {
         rut: rut
      }
   });
   console.log(result);
   res.json({ result });
}