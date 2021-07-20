require('dotenv').config();
require('./database');
require('@babel/register')({});
const app = require('./server').default;
const { sequelize } = require('./sequelize.js');




//Server is listening
app.listen(app.get('port'), () => {
   console.log('Server en puerto', app.get('port'));
   sequelize.authenticate().then(()=>{
      console.log('Postgres connected...');
   }).catch(e =>{
      console.log('No se ha podido conectar a postgres', e);
   })
});