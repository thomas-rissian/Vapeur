const express = require("express");
const router = express.Router();

const editorController = require("../controllers/editor");

router.get("/",editorController.LIST);

router.get("/create",editorController.CREATE_FORM);
router.post("/",editorController.CREATE);

router.get("/:id/modify",editorController.MODIFY_FORM);
router.post("/:id/modify",editorController.MODIFY);

router.post("/:id/delete",editorController.DELETE);
router.get("/:id/deleteCascade",editorController.DELETE_CASCADE_FORM);
router.post("/:id/deleteCascade",editorController.DELETE_CASCADE);

module.exports = {
    router,
}