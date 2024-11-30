const express = require("express");
const router = express.Router();

const gameController = require("../controllers/game");

router.get("/",gameController.list);
router.get("/create",gameController.createForm);
router.post("/",gameController.create);
router.get("/:id",gameController.detail);
router.get("/kind/:id",gameController.listByKind);
router.get("/editor/:id",gameController.listByEditor);
router.get("/:id/delete",gameController.deleteGame);

module.exports = {
    router,
}