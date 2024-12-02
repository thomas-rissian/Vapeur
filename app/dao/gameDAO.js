const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Game = require('../model/Game');

class GameDAO
{
    /**
     * Obtenir tous les jeux
     * @return list d'objet Game
     */
    async findAll(){
        try{
            const games = await prisma.game.findMany();
            return games.map(game => new Game(game));
        }catch(error){
            console.error("Game BDD: findAll", error);
        }
    }
    /**
     * Obtenir un jeu
     * @param int id
     * @return Game
     */
    async findById(id){
        try{
            id = parseInt(id);
            const game = await prisma.game.findUnique({
                where:{
                    id: id,
                }
            });
            
            if(!game){
                return new Game();
            }
            return new Game(game);
        }catch(error){
            console.error("Game BDD: findById", error);
        }
    }
    /**
     * Obtenir tous les jeux d'un éditeur
     * @returns list Game
     * @param id
     */
    async findByEditor(id){
        try{
            id = parseInt(id);
            const games = await prisma.game.findMany({
                where:{
                    editorId: id,
                }
            })
            return games.map(game => new Game(game));
        }catch(error){
            console.error("Game BDD: findByEditor", error);
        }
    }
    /**
     * Obtenir tous les jeux d'un genre
     * @param int
     * @returns list Game
     */
    async findByKind(id){
        try{
            id = parseInt(id);
            const games = await prisma.game.findMany()
            return games.map(game => new Game(game));
        }catch(error){
            console.error("Game BDD: findByKind", error);
        }
    }

    /**
     * Insert game
     * @param Game game
     */
    async createGame(game){
        try{
            await prisma.game.create({
                data : game.toJson(),
             });
        }catch(error){
            console.error("Game BDD: createGame", error);
        }
    }
    /**
     * Update game
     * @param game
     */
    async modifyGame(game){
        try{
            await prisma.game.update({
                data : game.toJson(),
                where:{
                    id: game.id,
                }
             });
        }catch(error){
            console.error("Game BDD: modifyGame", error);
        }
    }
    /**
     * Delete
     * @param Int id 
     */
    async deleteGame(id){
        try{
            id = parseInt(id);
            await prisma.game.delete({
                where:{
                    id: id,
                }
             });
        }catch(error){
            console.error("Game BDD: deleteGame", error);
        }
    }

    /**
     * Retourne 10 premier élément
     * @returns {Promise<Game[]>}
     */
    async highlighting(){
        try {
            const games = await prisma.game.findMany({
                take: 10,
            });
            return games.map(game => new Game(game));
        }catch (error) {
            console.error("Game BDD: highlighting", error);
        }
    }
}

module.exports = new GameDAO();