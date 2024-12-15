const kindDao = require("../dao/kindOfGameDAO");
const KindOfGame = require("../model/KindOfGame");

const defaultKind = [
    new KindOfGame({id : 1, name : "Action"}),
    new KindOfGame({id : 2, name : "Aventure"}),
    new KindOfGame({id : 3, name : "RPG"}),
    new KindOfGame({id : 4, name : "Simulation"}),
    new KindOfGame({id : 5, name : "Sport"}),
    new KindOfGame({id : 6, name : "MMORPG"}),
];

/**
 * Initialise la bdd si besoin avec ces genres de film (id forcé)
 */
async function initDb(){
    try {
        const nbKind = await kindDao.count();
        if(nbKind !== 6){
            for(const kind of defaultKind){
                const kindNew = await kindDao.findById(kind.id);
                ///S'il y a des erreurs, il n'existe pas
                if(kindNew.error.hasError()){
                    await kindDao.createKindOfGame(kind);
                }
            }
        }
    }catch (error){
        console.error("kindOfGame BDD: Init ", error);
    }
}

module.exports = {
    initDb
};