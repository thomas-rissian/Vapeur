const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const KindOfGame = require("../model/KindOfGame");

class kindOfGameDAO{
    /**
     * Obtenir tous les genres de jeu
     * @return {KindOfGame}
     */
    async findAll(){
        try{
            const kinds = await prisma.kindOfGame.findMany()
            return kinds.map(kind => new KindOfGame(kind));
        }catch(error){
            console.error("kindOfGame BDD: findAll", error);
        }
    }
    /**
     * Obtenir un genre de jeu
     * @param id
     * @return KindOfGame
     */
    async findById(id){
        try{
            id = parseInt(id);
            const kind = await prisma.kindOfGame.findUnique({
                where:{
                    id: id,
                }
            });
            if(!kind){
                return new KindOfGame();
            }
            return new KindOfGame(kind);
        }catch(error){
            console.error("kindOfGame BDD: findById", error);
        }
    }
    /**
     * Insert kindOfGame
     * @param kindOfGame
     */
    async createKindOfGame(kindOfGame){
        try{
            await prisma.kindOfGame.create({
                data : {
                    id: kindOfGame.id,
                    name: kindOfGame.name,
                },
             });
        }catch(error){
            console.error("kindOfGame BDD: createKindOfGame", error);
        }
    }

    /**
     *
     * @returns {Promise<number>}
     */
    async count(){
        try {
            return await prisma.kindOfGame.count();
        }catch (error){
            console.error("kindOfGame BDD: count ", error);
        }
    }
    async reset(){
        try {
            await prisma.kindOfGame.deleteMany();
        }catch (error){
            console.error("kindOfGame BDD: reset ", error);
        }
    }
}
module.exports = new kindOfGameDAO();