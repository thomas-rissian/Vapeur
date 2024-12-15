// Initialisation 
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

const PORT = 3080;

// Config
const {initDb} = require("./app/config/initDb");
initDb();
require("./app/config/handlebars");

// Configuration Template
app.use(express.static("public"));
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "/app/views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)

// Récupération req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Routage
const router = require("./app/router/route");
app.use("/",router.router);

// Ecoute sur le 3080
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

