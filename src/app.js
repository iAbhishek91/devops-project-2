const express = require("express");
const bodyParser = require("body-parser");
const uploadRouter = require("./routers/upload");

const app = express();

const PORT = 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// say hello
app.get("/",(_, res ) => {
  res.status(200);
  res.send("Welcome to our demo microservice");
});


app.use("/upload", uploadRouter);


app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
