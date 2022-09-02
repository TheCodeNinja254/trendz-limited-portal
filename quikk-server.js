const express = require("express");
const path = require("path");
const config = require("dotenv");

config.config();
const configValues = process.env;

const app = express();

app.use(
    express.static(path.join(__dirname, "build"))
);

app.get("/*", function (req, res) {
    console.log(
        `🚀 Client ready`
    );
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(configValues.PORT || 8000);
