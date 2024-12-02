const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const gameDao = require('../dao/gameDAO');

const HOME = async (req, res)=>{
    try{
        const gameTop = await gameDao.highlighting();
        const highlighting = {};
        res.render("index",{gameTop, highlighting});

    }catch(error){
        console.error("error homePage",error);
        res.status(500).send("Error Home Page don't work");
    }
}

module.exports =
{
    HOME,
};