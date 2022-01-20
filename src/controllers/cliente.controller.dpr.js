import {QueryTypes } from 'sequelize';
import Cliente from '../model/cliente';

export async function createCliente(req, res) {
   const data_in = req.body;
   await Cliente.create(data_in)
      .catch(err => { console.error(err); res.status(400).json(err) })
   ;
   console.log(data_in);
   res.json({
      'message': 'Cliente creado satisfactoriamente',
      'data': data_in
   });
}

export async function getClienteByRut(req, res) {
   const rut = req.params.rut;
   console.log(rut);
   const result = await Cliente.findAll({
      where: {
         rut: rut
      }
   })
   .catch(err=>{console.error(err); res.status(400).json(err)})
   console.log(result);
   res.json(result);

}

export async function getClienteByQuery(req, res) {
   const query = req.query;
   console.log(query);
   if (JSON.stringify(query) != "{}") {
      // eslint-disable-next-line no-useless-escape
      const queryvalues = JSON.stringify(query).match(/([\w]+)([\w\d\s\-]+)/g);
      console.log(queryvalues)
      if (queryvalues.length == 2) {
         const querystring = `SELECT * FROM clientes WHERE CAST(${queryvalues[0]} as TEXT) ILIKE '%${queryvalues[1]}%'`;
         const result = await Cliente.sequelize.query(querystring, { type: QueryTypes.SELECT })
            .catch(err => { console.error(err); res.status(400).json(err) })
         ;
         res.json(result);
      } if (queryvalues.length == 4) {
         const querystring = `SELECT * FROM clientes WHERE CAST(${queryvalues[0]} as TEXT) ILIKE '%${queryvalues[1]}%' AND CAST(${queryvalues[2]} as TEXT) ILIKE '%${queryvalues[3]}%'`;
         const result = await Cliente.sequelize.query(querystring, { type: QueryTypes.SELECT })
            .catch(err => { console.error(err); res.status(400).json(err) })
         ;
         res.json(result);
      } if (queryvalues.length == 6) {
         const querystring = `SELECT * FROM clientes WHERE CAST(${queryvalues[0]} as TEXT) ILIKE '%${queryvalues[1]}%' AND CAST(${queryvalues[2]} as TEXT) ILIKE '%${queryvalues[3]}%' AND CAST(${queryvalues[4]} as TEXT) ILIKE '%${queryvalues[5]}%'`;
         console.log(querystring)
         const result = await Cliente.sequelize.query(querystring, { type: QueryTypes.SELECT })
            .catch(err => { console.error(err); res.status(400).json(err) })
         ;
         res.json(result);
      } if (queryvalues.length == 8) {
         const querystring = `SELECT * FROM clientes WHERE CAST(${queryvalues[0]} as TEXT) ILIKE '%${queryvalues[1]}%' AND CAST(${queryvalues[2]} as TEXT) ILIKE '%${queryvalues[3]}%' AND CAST(${queryvalues[4]} as TEXT) ILIKE '%${queryvalues[5]}%' AND CAST(${queryvalues[6]} as TEXT) ILIKE '%${queryvalues[7]}%'`;
         console.log(querystring)
         const result = await Cliente.sequelize.query(querystring, { type: QueryTypes.SELECT })
            .catch(err => { console.error(err); res.status(400).json(err) })
         ;
         res.json(result);
      } if (queryvalues.length == 10) {
         const querystring = `SELECT * FROM clientes WHERE CAST(${queryvalues[0]} as TEXT) ILIKE '%${queryvalues[1]}%' AND CAST(${queryvalues[2]} as TEXT) ILIKE '%${queryvalues[3]}%' AND CAST(${queryvalues[4]} as TEXT) ILIKE '%${queryvalues[5]}%' AND CAST(${queryvalues[6]} as TEXT) ILIKE '%${queryvalues[7]}%' AND CAST(${queryvalues[8]} as TEXT) ILIKE '%${queryvalues[9]}%'`;
         console.log(querystring)
         const result = await Cliente.sequelize.query(querystring, { type: QueryTypes.SELECT })
            .catch(err => { console.error(err); res.status(400).json(err) })
         ;
         res.json(result);
      }

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
   })
      .catch(err => { console.error(err); res.status(400).json(err) })
   ;
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
   })
      .catch(err => { console.error(err); res.status(400).json(err) })
   ;
   console.log(result);
   res.json({ result });
}