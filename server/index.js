const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const listen = require("./utils/listenser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

listen();

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});
