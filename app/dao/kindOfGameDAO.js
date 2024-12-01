const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const kindOfGame = require("../model/KindOfGame");

class kindOfGameDAO{
    /**
     * Obtenir tous les genres de jeu
     * @return list d'objet kindOfGame
     */
    async findAll(){
        try{
            const kinds = await prisma.kindOfGame.findMany()
            return kinds.map(kind => new kindOfGame(kind));
        }catch(error){
            console.error("Editor BDD: findAll", error);
        }
    }
    /**
     * Obtenir un genre de jeu
     * @param int id
     * @return kindOfGame
     */
    async findById(id){
        try{
            id = parseInt(id);
            const editor = await prisma.kindOfGame.findUnique({
                where:{
                    id: id,
                }
            });
            if(!editor){
                return new kindOfGame();
            }
            return new kindOfGame(editor);
        }catch(error){
            console.error("Editor BDD: findById", error);
        }
    }
    /**
     * Insert kindOfGame
     * @param KindOfGame kindOfGame
     */
    async createEditor(kindOfGame){
        try{
            await prisma.kindOfGame.create({
                data : kindOfGame.toJson(),
             });
        }catch(error){
            console.error("Editor BDD: createEditor", error);
        }
    }
    /**
     * Update kindOfGame
     * @param KindOfGame kindOfGame 
     */
    async modifyEditor(kindOfGame){
        try{
            await prisma.kindOfGame.update({
                data : kindOfGame.toJson(),
                where:{
                    id: kindOfGame.id,
                }
             });
        }catch(error){
            console.error("Editor BDD: modifyEditor", error);
        }
    }
    /**
     * Delete
     * @param Int id 
     */
    async deleteEditor(id){
        try{
            id = parseInt(id);
            await prisma.kindOfGame.delete({
                where:{
                    id: id,
                }
             });
        }catch(error){
            console.error("editor BDD: deleteEditor", error);
        }
    }
}
module.exports = new kindOfGameDAO();