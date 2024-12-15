const Game = require("../model/Game");
const gameDao = require('../dao/gameDAO');
const editorDao = require('../dao/editorDAO');
const kindOfGameDao = require('../dao/kindOfGameDAO');
const highlightingDAO = require('../dao/highlightingDAO');

const LIST = async (req, res) => {
    try {
        const games = await gameDao.findAll();
        res.render("./game/index", { games });
    } catch (error) {
        console.error("error listGame", error);
        res.status(500).send("Internal Server Error: Unable to list games.");
    }
};

const DETAIL = async (req, res) => {
    try {
        const game = await gameDao.findById(req.params.id);
        console.log(game);
        if (game === null) {
            res.status(404).redirect("/");
            return;
        }
        const editor = await editorDao.findById(game.editorId);
        const kind = await kindOfGameDao.findById(game.kindId);
        res.render("./game/detail", { game, editor, kind });
    } catch (error) {
        console.error("error detail game", error);
        res.status(500).send("Internal Server Error: Unable to get game details.");
    }
};

const CREATE = async (req, res) => {
    try {
        const game = new Game(req.body);
        if (game.error.hasError()) {
            const editors = await editorDao.findAll();
            const kinds = await kindOfGameDao.findAll();
            const error = game.error.getErrors();
            res.status(400).render("./game/create", { editors, kinds, game, error });
            return;
        }
        await gameDao.createGame(game);
        res.status(201).redirect('/game');
    } catch (error) {
        console.error("error create game", error);
        res.status(500).send("Internal Server Error: Unable to create game.");
    }
};

const CREATE_FORM = async (req, res) => {
    try {
        const editors = await editorDao.findAll();
        const kinds = await kindOfGameDao.findAll();
        const game = new Game();
        res.render("./game/create", { editors, kinds, game });
    } catch (error) {
        console.error("error createForm game", error);
        res.status(500).send("Internal Server Error: Unable to load game creation form.");
    }
};

const MODIFY = async (req, res) => {
    try {
        req.body.id = req.params.id;
        const game = new Game(req.body);
        if (game.error.hasError()) {
            const editors = await editorDao.findAll();
            const kinds = await kindOfGameDao.findAll();
            const error = game.error.getErrors();
            return res.status(400).render("./game/modify", { game, editors, kinds, error });
        }
        await gameDao.modifyGame(game);
        res.status(200).redirect(`/game/${game.id}`);
    } catch (error) {
        console.error("error modify game", error);
        res.status(500).send("Internal Server Error: Unable to modify game.");
    }
};

const MODIFY_FORM = async (req, res) => {
    try {
        const game = await gameDao.findById(req.params.id);
        if (!game) {
            res.status(404).redirect("/");
            return;
        }
        const editors = await editorDao.findAll();
        const kinds = await kindOfGameDao.findAll();
        res.render("./game/modify", { game, editors, kinds });
    } catch (error) {
        console.error("error modifyForm game", error);
        res.status(500).send("Internal Server Error: Unable to load game modification form.");
    }
};

const LIST_BY_KIND = async (req, res) => {
    try {
        const games = await gameDao.findByKind(req.params.id);
        const kind = await kindOfGameDao.findById(req.params.id);
        if (!kind) {
            res.status(404).redirect("/");
            return;
        }
        res.render("./game/listByKind", { games, kind });
    } catch (error) {
        console.error("error listByKind game", error);
        res.status(500).send("Internal Server Error: Unable to list games by kind.");
    }
};

const LIST_BY_EDITOR = async (req, res) => {
    try {
        const games = await gameDao.findByEditor(req.params.id);
        const editor = await editorDao.findById(req.params.id);
        if (!editor) {
            res.status(404).redirect("/");
            return;
        }
        res.render("./game/listByeditor", { games, editor });
    } catch (error) {
        console.error("error listByEditor game", error);
        res.status(500).send("Internal Server Error: Unable to list games by editor.");
    }
};

const DELETE = async (req, res) => {
    try {
        const game = await gameDao.findById(req.params.id);
        if (!game) {
            res.status(404).send("Game not found.");
            return;
        }
        await gameDao.deleteGame(req.params.id);
        res.status(200).redirect("/game");
    } catch (error) {
        console.error("error delete game", error);
        res.status(500).send("Internal Server Error: Unable to delete game.");
    }
};

const HIGHLIGHTING = async (req, res) => {
    try {
        const highlighted = await highlightingDAO.findById(req.params.id);
        if (highlighted) {
            await highlightingDAO.deleteHighlighting(req.params.id);
            res.status(200).redirect(req.get('Referer'));
        } else {
            await highlightingDAO.addHighlighting(req.params.id);
            res.status(200).redirect(req.get('Referer'));
        }
    } catch (error) {
        console.error("error highlighting game", error);
        res.status(500).send("Internal Server Error: Unable to update highlighting.");
    }
};

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
};
