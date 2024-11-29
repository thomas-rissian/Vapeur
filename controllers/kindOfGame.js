const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listKind = async (req, res) =>{
    try{
        const kind = await prisma.kindOfGame.findMany();
        res.send(kind);
    }catch(error){

    }
};

module.exports = {
    listKind,
}