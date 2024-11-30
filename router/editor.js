const express = require("express");
const router = express.Router();

const editorController = require("../controllers/editor");

router.get("/",editorController.list);
router.get("/create",editorController.createForm);
router.post("/",editorController.create);
router.get("/:id/delete",editorController.deleteEditor);

module.exports = {
    router,
}