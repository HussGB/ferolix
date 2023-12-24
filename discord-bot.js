const express = require("express");
const app = express();

require("./index.js")

const listener = app.listen(3005, () => {
  console.log("Your app is listening on port " + listener.address().port);
});