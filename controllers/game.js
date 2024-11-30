const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const list = async (req, res) =>{
    try{
        const games = await prisma.game.findMany();
        res.render("./game/index",{games});
    }catch(error){
        console.error("error listGame", error);
        res.status(500).send("Error List Game don't work");
    }
};

const detail = async (req, res) =>{
    try{
        const game = await await prisma.game.findUnique({
            where:{
                id: parseInt(req.params.id),
            }
        });
        if(!game){
            res.status(404).send("404 Not Found");
        }
        const editor = await prisma.editor.findUnique({
            where:{
                id: parseInt(game.editorId),
            }
        });
        const kind = await prisma.kindOfGame.findUnique({
            where:{
                id: parseInt(game.kindId),
            }
        });
        game.releaseDate = game.releaseDate.toLocaleDateString("fr")
        res.render("./game/detail", {game, editor, kind});
    }catch(error){
        console.error("error detail game", error);  
        res.status(500).send("Error detail Game don't work");
    }
}

const create = async (req, res) =>{
    try{
        const game = req.body;
        game.releaseDate = new Date(game.releaseDate);
        game.kindId = parseInt(game.kindId);
        game.editorId = parseInt(game.editorId);
        await prisma.game.create({
           data : game,
        });
        res.status(201).redirect('/game');
    }catch(error){
        console.error("error create game", error);
        res.status(500).send("Error Create Game don't work");
    }
};
const createForm = async (req, res) =>{
    try{
        const editors = await prisma.editor.findMany();
        const kinds = await prisma.kindOfGame.findMany();
        res.render("./game/create",{editors,kinds});
    }catch(error){
        console.error("error createForm game", error);
        res.status(500).send("Error Create Form Game don't work");
    }
};

const listByKind = async (req,res)=>{
    try{
        const games = await prisma.game.findMany({
            where:{
                kindId: parseInt(req.params.id),
            }
        });
        res.render("./game/index",{games});
    }catch(error){
        console.error("error listByKind game", error);
        res.status(500).send("Error Game List By Kind Game don't work");
    }
}

const listByEditor = async (req,res)=>{
    try{
        const games = await prisma.game.findMany({
            where:{
                editorId: parseInt(req.params.id),
            }
        });
        res.render("./game/index",{games});
    }catch(error){
        console.error("error listByEditor game", error);
        res.status(500).send("Error Game Liste By Editor don't work");
    }
}

const deleteGame = async (req,res)=>{
    try{
        await prisma.game.delete({
            where:{
                id: parseInt(req.params.id),
            }
        })
        res.status(200).redirect("/game");
    }catch(error){
        console.error("error listByEditor game", error);
        res.status(500).send("Error Game Liste By Editor don't work");
    }
}

module.exports = {
    list,
    create,  
    createForm,  
    detail,
    listByKind,
    listByEditor,
    deleteGame,
}