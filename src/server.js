const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");

require("./db/mongoose");

const landingRouter = require("./routers/index");
const donorRouter = require("./routers/donor");
const bloodbankRouter = require("./routers/bloodbank");
const managementRouter = require("./routers/management");

const app = express();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.use(express.json());

app.use(donorRouter);
app.use(bloodbankRouter);
app.use(landingRouter);
app.use(managementRouter);

app.listen(port, () => {
  console.log("Server started on port 3000");
});
