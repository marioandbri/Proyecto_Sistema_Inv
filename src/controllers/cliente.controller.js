import {Sequelize} from 'sequelize';
import Cliente from '../model/cliente';

export async function createCliente(req, res){
   const data_in = req.body;
   await Cliente.create(data_in);
   console.log(data_in);
   res.json({
      'message': 'Cliente creado satisfactoriamente',
      'data': data_in 
   });
};

export async function getClienteByRut(req, res){
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

export async function getClienteByQuery(req, res){
   const query = req.query;
   const jsonquery = JSON.stringify(query);
   console.log(decodeURI(jsonquery));
   console.log(decodeURI(query));
   const result = await Cliente.findAll(jsonquery==="{}"?{}:{
      where:JSON.parse(decodeURI(jsonquery))
   });
   console.log(result);
   res.json({result});
}

export async function updateCliente(req, res){
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
   res.json({result});

}

export async function deleteCliente(req, res){
   const rut = req.params.rut;
   console.log(rut);
   const result = await Cliente.destroy({
      where: {
         rut: rut
      }
   });
   console.log(result);
   res.json({result});
}