require("sexy-require");
require("./auth");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");

const PORT = process.env.PORT || 1337;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api", routes);

app.use(function (err, _req, res) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
