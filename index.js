require("sexy-require");

const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 1337;
const app = express();

require("./auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routes);

app.use(function (err, _req, res) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
