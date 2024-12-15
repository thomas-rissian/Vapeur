const editorDao = require('../dao/editorDAO');
const Editor = require("../model/Editor");
const gameDao = require('../dao/gameDao');

const LIST = async (req, res) => {
    try {
        const editors = await editorDao.findAll();
        return res.render("./editor/index", { editors });
    } catch (error) {
        console.error("error editorList", error);
        return res.status(500).send("Erreur interne, impossible de récupérer la liste des éditeurs");
    }
};

const CREATE = async (req, res) => {
    try {
        const editor = new Editor(req.body);
        await editorDao.createEditor(editor);
        return res.status(201).redirect('/editor');
    } catch (error) {
        console.error("error create editor", error);
        return res.status(500).send("Erreur lors de la création de l'éditeur");
    }
};

const CREATE_FORM = async (req, res) => {
    try {
        res.render("./editor/create");
    } catch (error) {
        console.error("error createForm editor", error);
        return res.status(500).send("Erreur lors de l'affichage du formulaire de création de l'éditeur");
    }
};

const MODIFY = async (req, res) => {
    try {
        const editor = new Editor(req.body);
        editor.setId(req.params.id);
        await editorDao.modifyEditor(editor);
        return res.status(200).redirect('/editor');
    } catch (error) {
        console.error("error modify editor", error);
        return res.status(500).send("Erreur lors de la modification de l'éditeur");
    }
};

const MODIFY_FORM = async (req, res) => {
    try {
        const editor = await editorDao.findById(req.params.id);
        if (!editor) {
            return res.status(404).redirect('/editor');
        }
        const error = editor.error.getErrors();
        return res.render("./editor/modify", { editor, error });
    } catch (error) {
        console.error("error createForm editor", error);
        return res.status(500).send("Erreur lors de l'affichage du formulaire de modification de l'éditeur");
    }
};

const DELETE = async (req, res) => {
    try {
        const editor = await editorDao.findById(req.params.id);
        const gameByEditor = await gameDao.findByEditor(editor.id);

        if (Object.keys(gameByEditor).length > 0) {
            return res.status(400).redirect(`/editor/${editor.id}/deleteCascade`);
        }

        if (!editor.error.hasError()) {
            await editorDao.deleteEditor(editor.id);
        } else {
            const error = "Impossible de supprimer, des jeux sont encore liés à cet éditeur";
            return res.status(400).render("/editor/modify", { editor, error });
        }

        return res.status(200).redirect("/editor");
    } catch (error) {
        console.error("error delete editor", error);
        return res.status(500).send("Erreur lors de la suppression de l'éditeur");
    }
};

const DELETE_CASCADE_FORM = async (req, res) => {
    try {
        const game = await gameDao.findByEditor(req.params.id);
        const editor = await editorDao.findById(req.params.id);
        const gameCount = Object.keys(game).length;
        return res.render("./editor/deleteCascade", { editor, gameCount });
    } catch (error) {
        console.error("error deleteCascadeForm editor", error);
        return res.status(500).send("Erreur lors de l'affichage du formulaire de suppression en cascade de l'éditeur");
    }
};

const DELETE_CASCADE = async (req, res) => {
    try {
        await gameDao.deleteEditorGame(req.params.id);
        await editorDao.deleteEditor(req.params.id);
        return res.status(200).redirect('/editor');
    } catch (error) {
        console.error("error deleteCascade editor", error);
        return res.status(500).send("Erreur lors de la suppression en cascade de l'éditeur");
    }
};

module.exports = {
    LIST,
    CREATE,
    CREATE_FORM,
    DELETE,
    MODIFY,
    MODIFY_FORM,
    DELETE_CASCADE_FORM,
    DELETE_CASCADE
};
