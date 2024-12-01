const kindOfGameDao = require('../dao/kindOfGameDAO');

const LIST = async (req, res) =>{
    try{
        const kinds = await kindOfGameDao.findAll();
        res.render('./kindOfGame/index', {kinds: kinds});
    }catch(error){
        console.error("error listKind", error);
        res.status(500).send("Error List Kind don't work");
    }
};


module.exports = {
    LIST,
}