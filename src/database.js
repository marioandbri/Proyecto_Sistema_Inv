const mongo = require("mongoose");


const { MONGODB_HOST, MONGODB_DATABASE } = process.env;
const MONGODB_URL = `mongodb://${ MONGODB_HOST }/${ MONGODB_DATABASE }`;


mongo.connect(MONGODB_URL, {
   useUnifiedTopology: true,
   useNewUrlParser: true

})
   .then(db => console.log('MongoDB connected...'))
   .catch(err => console.log(err));