require('dotenv').config();
require('./database');

const app = require('./server')


//Server is listening
app.listen(app.get('port'), () => {
   console.log('Server en puerto', app.get('port'));
});