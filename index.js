const express = require("express");
const cors = require("cors");
const router = require("./app/routes/routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(5000, () => {
  console.log("server is running");
});
