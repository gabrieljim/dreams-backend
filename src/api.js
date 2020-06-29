const mongoose = require("mongoose");
const serverless = require("serverless-http");
const express = require("express");
const expressApp = express();
const env = require("./env");

mongoose.connect(env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = require("./routes/users");
const dreams = require("./routes/dreams");

expressApp.use(express.json());

expressApp.get("/", (_, res) => res.send("ay"));

expressApp.use("/users", users);
expressApp.use("/dreams", dreams);

expressApp.listen(9004, () => console.log("listening"));

/*

### Code when using netlify, things being poor makes you do ###

const app = express.Router({ mergeParams: true });

app.use(express.json());

app.use("/users", users);
app.use("/dreams", dreams);


expressApp.use("/.netlify/functions/api", app);

module.exports.handler = serverless(expressApp);

*/
