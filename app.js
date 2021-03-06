const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

//Initialize tha app

const app = express();

//Add middleware

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database connection

//Routes

app.use("/data", (req, res) => {
  const UINT16_t_MAX = 65536;
  const INT16_t_MAX = 32767;

  let moduleTemp = req.body.field1;

  let distance = req.body.field2;

  let temp1 = ((moduleTemp / INT16_t_MAX) * 120).toFixed(2);

  let convdistance = ((distance / UINT16_t_MAX) * 600).toFixed(2);

  try {
    // console.log(req.params);
    // console.log(req.query);
    console.log(req.body);

    console.log(
      `The module temp is ${temp1}, and the distance is ${convdistance} cm `
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Resource Unaivalable" });
});

//Listening
const port = 8080;

app.listen(port, () => {
  console.info(`The app is listening on port ${port}`);
});
