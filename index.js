// Initialisation 
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const hbs = require("hbs");
const path = require("path");
const prisma = new PrismaClient();

const PORT = 3080;

// Init Bdd
try{
    initDb();
}catch(error){
    console.error("error ", error);
    process.exit(1);
}

// Configuration Template
app.use(express.static("public"));
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Récupération req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Routage
const router = require("./router/route");
app.use("/",router.router);

// Ecoute sur le 3080
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

async function initDb(){
    const defaultKind = [
        {id : 1, name : "Action"},
        {id : 2, name : "Aventure"},
        {id : 3, name : "RPG"},
        {id : 4, name : "Simulation"},
        {id : 5, name : "Sport"},
        {id : 6, name : "MMORPG"},
    ];
    for(const kind of defaultKind){
        const existKind = await prisma.kindOfGame.findUnique({
            where: {id: kind.id}
        });
        if(!existKind){
            await prisma.kindOfGame.create({
                data: kind,
            })
        }
    }
}
