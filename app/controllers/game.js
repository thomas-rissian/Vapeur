
const Game = require("../model/Game");
const gameDao = require('../dao/gameDAO');
const editorDao = require('../dao/editorDAO');
const kindOfGameDao = require('../dao/kindOfGameDAO');
const highlightingDAO = require('../dao/highlightingDAO');

const LIST = async (req, res) =>{
    try{
        const games = await gameDao.findAll();

        res.render("./game/index",{games});
    }catch(error){
        console.error("error listGame", error);
        res.status(500).send("Error List Game don't work");
    }
};

const DETAIL = async (req, res) =>{
    try{    
        const game = await gameDao.findById(req.params.id);
        if(game.error.hasError()){
            res.redirect("/game");
            return;
        }
        const editor = await editorDao.findById(game.editorId);
        const kind = await kindOfGameDao.findById(game.kindId);
        res.render("./game/detail", {game, editor, kind});
    }catch(error){
        console.error("error detail game", error);  
        res.status(500).send("Error detail Game don't work");
    }
}

const CREATE = async (req, res) =>{
    try{
        const game = new Game(req.body);
        if(game.error.hasError()){
            res.send(game.error.getErrors());
            return;
        }
        await gameDao.createGame(game);
        res.status(201).redirect('/game');
    }catch(error){
        console.error("error create game", error);
        res.status(500).send("Error Create Game don't work");
    }
};
const CREATE_FORM = async (req, res) =>{
    try{
        const editors = await editorDao.findAll();
        const kinds = await kindOfGameDao.findAll();
        const game = new Game();
        res.render("./game/create",{editors,kinds, game});
    }catch(error){
        console.error("error createForm game", error);
        res.status(500).send("Error Create Form Game don't work");
    }
};

const MODIFY = async (req, res) =>{
    try{
        req.body.id = req.params.id;
        const game = new Game(req.body);
        if(game.error.hasError()){
            res.send(game.error.getErrors());
            return;
        }
        await gameDao.modifyGame(game);
        res.status(201).redirect('/game/'+game.id);
    }catch(error){
        console.error("error modify game", error);
        res.status(500).send("Error modify Game don't work");
    }
};
const MODIFY_FORM = async (req, res) =>{
    try{
        const game = await gameDao.findById(req.params.id);
        if(game.error.hasError()){
            res.redirect("/game");
            return;
        }
        const editors = await editorDao.findAll();
        const kinds = await kindOfGameDao.findAll()
        res.render("./game/modify",{game,editors,kinds});
    }catch(error){
        console.error("error modifyForm game", error);
        res.status(500).send("Error modify Form Game don't work");
    }
};

const LIST_BY_KIND = async (req,res)=>{
    try{
        const games = await gameDao.findByKind(req.params.id);
        const kind = await kindOfGameDao.findById(req.params.id);
         res.render("./game/listByKind",{games, kind});
    }catch(error){
        console.error("error listByKind game", error);
        res.status(500).send("Error Game List By Kind Game don't work");
    }
}

const LIST_BY_EDITOR = async (req,res)=>{
    try{
        const games = await gameDao.findByEditor(req.params.id);
        res.render("./game/index",{games});
    }catch(error){
        console.error("error listByEditor game", error);
        res.status(500).send("Error Game Liste By Editor don't work");
    }
}

const DELETE = async (req,res)=>{
    try{
        await gameDao.deleteGame(req.params.id)
        res.status(200).redirect("/game");
    }catch(error){
        console.error("error delete game", error);
        res.status(500).send("Error delete don't work");
    }
}
const HIGHLIGHTING = async (req,res)=>{
    try {
        const highlighted = await highlightingDAO.findById(req.params.id);
        if(highlighted){
            await highlightingDAO.deleteHighlighting(req.params.id);
            res.status(200).redirectEnd();
        }else{
            await highlightingDAO.addHighlighting(req.params.id);
            res.status(200).redirectEnd();
        }
    }catch(error){
        console.error("error highlighting game", error);
        res.status(500).send("Error highlighting don't work");
    }
}
module.exports = {
    LIST,
    LIST_BY_KIND,
    CREATE,
    CREATE_FORM,
    MODIFY,
    MODIFY_FORM,
    DETAIL,
    LIST_BY_EDITOR,
    DELETE,
    HIGHLIGHTING
}