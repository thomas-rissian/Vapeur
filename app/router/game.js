const express = require("express");
const router = express.Router();

const gameController = require("../controllers/game");

router.get("/",gameController.LIST);
router.get("/create",gameController.CREATE_FORM);
router.post("/create",gameController.CREATE);

router.get("/kind/:id",gameController.LIST_BY_KIND);
router.get("/editor/:id",gameController.LIST_BY_EDITOR);

router.get("/:id/modify", gameController.MODIFY_FORM);
router.post("/:id/modify", gameController.MODIFY);

router.get("/:id",gameController.DETAIL);
router.post("/:id/delete",gameController.DELETE);

module.exports = {
    router,
}