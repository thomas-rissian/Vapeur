const express = require("express");
const router = express.Router();

const game = require("./game");
const editor = require("./editor");
const kindOfGame = require("./kind");
const home = require("./default");
const error = require("./error");

router.use("/game",game.router);
router.use("/editor",editor.router);
router.use("/kind",kindOfGame.router);
router.use("/",home.router);
router.use("/",error.router);



module.exports = {
    router,
}