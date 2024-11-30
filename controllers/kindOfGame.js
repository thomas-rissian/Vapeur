const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const list = async (req, res) =>{
    try{
        const kind = await prisma.kindOfGame.findMany();
        res.send(kind);
    }catch(error){
        console.error("error listKind", error);
        res.status(500).send("Error List Kind don't work");
    }
};


module.exports = {
    list,
}