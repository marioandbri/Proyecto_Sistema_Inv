const mongo = require("mongoose");

const {
	MONGODB_HOST,
	MONGODB_DATABASE,
	MONGODB_USERNAME,
	MONGODB_PASSWORD,
	REMOTE_DEPLOY,
} = process.env;
export const MONGODB_URL =
	REMOTE_DEPLOY == "true"
		? `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}`
		: `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}`;

mongo
	.connect(MONGODB_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		authSource: "admin",
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("MongoDB connected...");
	})
	.catch((err) => console.log(err));
