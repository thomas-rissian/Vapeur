const express = require("express");
const router = express.Router();

const kindOfGameController = require("../controllers/kindOfGame");

router.get("/",kindOfGameController.LIST);

module.exports = {
    router,
}