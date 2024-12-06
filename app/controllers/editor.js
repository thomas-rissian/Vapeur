
const editorDao = require('../dao/editorDAO');
const Editor = require("../model/Editor");
const gameDao = require('../dao/gameDao');
const LIST = async (req, res) =>{
    try{
        const editors = await editorDao.findAll();
        return res.render("./editor/index",{editors});
    }catch(error){  
        console.error("error editorList", error);
        return res.status(500).send("Error List Editor don't work");
    }
};
const CREATE = async (req, res) =>{
    try{
        const editor = new Editor(req   .body);
        await editorDao.createEditor(editor);
        return res.status(201).redirect('/editor');
    }catch(error){
        console.error("error create editor", error);
        return res.status(500).send("Error Create editor don't work");
    }
};
const CREATE_FORM = async (req, res) =>{
    try{
        res.render("./editor/create");
    }catch(error){
        console.error("error createForm editor", error);
        return  res.status(500).send("Error Create Form Editor don't work");
    }
};

const MODIFY = async (req, res) =>{
    try{
        const editor = new Editor(req.body);
        editor.setId(req.params.id);
        await editorDao.modifyEditor(editor);
        return res.status(201).redirect('/editor');
    }catch(error){
        console.error("error create editor", error);
        return res.status(500).send("Error modify editor don't work");
    }
};
const MODIFY_FORM = async (req, res) =>{
    try{
        const editor = await editorDao.findById(req.params.id);
        const error = "";
        return res.render("./editor/modify", {editor,error});
    }catch(error){
        console.error("error createForm editor", error);
        return res.status(500).send("Error Create Form Editor don't work");
    }
};

const DELETE = async (req, res)=>{
    try{
        const editor = await editorDao.findById(req.params.id);
        const gameByEditor = await gameDao.findByEditor(editor.id);
        if(Object.keys(gameByEditor).length > 0){
            return res.status(200).redirect(`/editor/${editor.id}/deleteCascade`);
        }
        if(!editor.error.hasError()){
            await editorDao.deleteEditor(editor.id);
        }else{
            const error = "Impossible de supprimer Car des jeux sont encore lié à cet éditeur";
            res.status(400).render("/editor/modify",{editor,error});
        }
        return res.status(200).redirect("/editor");
    }catch(error){
        console.error("error delete editor", error);
        return res.status(500).send("Error delete editor don't work");
    }
}
const DELETE_CASCADE_FORM = async (req, res) =>{
    try{
        const game = await gameDao.findByEditor(req.params.id);
        const editor = await editorDao.findById(req.params.id);
        const gameCount = Object.keys(game).length;
        return res.render("./editor/deleteCascade", {editor,gameCount});
    }catch(error){
        console.error("error createForm editor", error);
        res.status(500).send("Error Create Form Editor don't work");
        return 0;
    }
}
const DELETE_CASCADE = async (req, res) =>{
    try{
        await gameDao.deleteEditorGame(req.params.id);
        await editorDao.deleteEditor(req.params.id);
        return res.status(200).redirect('/editor');
    }catch(error){
        console.error("error deleteCascade editor", error);
        return res.status(500).send("Error delete Editor Cascade don't work");
    }
}
module.exports = {
    LIST,
    CREATE,
    CREATE_FORM,
    DELETE,
    MODIFY,
    MODIFY_FORM,
    DELETE_CASCADE_FORM,
    DELETE_CASCADE
}