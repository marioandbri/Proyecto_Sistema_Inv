const session = require("express-session");
var MongoStore = require("connect-mongo");
import { MONGODB_URL } from "./database";
const { SESSION_SECRET } = process.env

const sessionStore = MongoStore.create({
  mongoUrl: MONGODB_URL,
  mongoOptions: {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    authSource: "admin",
  },
  collectionName: "sessions",
});

export const sessionMiddleware = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    sameSite: true,
    maxAge: 1000*3600*12,
  },
});
