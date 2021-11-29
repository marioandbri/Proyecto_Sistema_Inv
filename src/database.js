const mongo = require("mongoose");

const { MONGODB_HOST, MONGODB_DATABASE, MONGODB_USERNAME, MONGODB_PASSWORD } =
  process.env;
const MONGODB_URL = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}`;

mongo
  .connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: "admin",
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
