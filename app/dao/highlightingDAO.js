const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class highlightingDAO{
    /**
     * Ajoute le jeu dans la mise en avant
     * @param id
     */
    async addHighlighting(id){
        try {
            id = parseInt(id);
            await prisma.highlighting.create({
                data:{
                    gameId : id,
                }

            });
        }catch (error){
            console.error("highlighting BDD: add", error);
        }
    }
    /**
     * Supprime le jeu dans la mise en avant
     * @param id
     */
    async deleteHighlighting(id){
        try {
            id=parseInt(id);
            await prisma.highlighting.delete({where: {
                    gameId: id,
                },
            });
        }catch (error){
            console.error("highlighting BDD: delete", error);
        }
    }
    /**
     * Récupère le jeu dans la mise en avant
     * @param id
     */
    async findById(id){
        try {
            id=parseInt(id);
            return await prisma.highlighting.findUnique({
                where: {
                    gameId: id,
                },
            });
        }catch (error){
            console.error("highlighting BDD: findById", error);
        }
    }

}
module.exports = new highlightingDAO();