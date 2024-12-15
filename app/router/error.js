const express = require("express");
const router = express.Router();

router.use("/",(req, res) =>{
    const status = req.status || 404;
    console.error(status);
    if(status === 404){
        res.status(404).redirect("/");
    }
    else if (status === 500){
        res.status(500).send("500 : Server error");
    }
});

module.exports = {router};