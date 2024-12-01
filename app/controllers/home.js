const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const HOME = async (req, res)=>{
    try{

        res.render("index");

    }catch(error){
        console.error("error homePage",error);
        res.status(500).send("Error Home Page don't work");
    }
}

module.exports =
{
    HOME,
};