const express = require('express');
const orderRouter = require("./Route/orderRoute")
const jwtAuthRoute = require("./Route/jwtAuthRoute");
const passport = require("passport")
const mongoose = require("mongoose")
require("./middleware/jwtAuthentication")(passport)

const dotEnv = require('dotenv')
dotEnv.config()

const PORT = 8888

const app = express();

app.use(express.json());
app.use(passport.initialize())
app.use("Api/order", passport.authenticate('jwt', { session: false }) ,orderRouter)
app.use("/Api", jwtAuthRoute )

mongoose.connect(process.env.DATABASE)

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})