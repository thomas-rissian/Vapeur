const express = require("express");
const router = express.Router();

const kindOfGameController = require("../controllers/kindOfGame");

router.get("/",kindOfGameController.list);

module.exports = {
    router,
}