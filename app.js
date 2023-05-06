const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Allow access to request body as req.body.
app.use(morgan("dev"));  // Log incoming request in dev mode.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the endpoint(s).
app.get("/ping", (req, res) => {  
    return res.send({
        error: false,
        message: "Healthy",
    });
});

app.listen(PORT, () => {
    console.log("Server started listening on port: ", PORT);
});