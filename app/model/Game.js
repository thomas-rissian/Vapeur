const CustomError = require("./Error");
const req = require("express/lib/request");
class Game{

    #id = 0;
    #name = "";
    #desc = "";
    #releaseDate = new Date();
    #kindId = 0;
    #editorId = 0;
    #favorite;
    #image ="";
    #error;

    constructor(reqBody ={}) {
        this.#error = new CustomError();
        if (reqBody.id) this.setId(reqBody.id);
        this.setName(reqBody.name || "");
        this.setDesc(reqBody.desc || "");
        this.setReleaseDate(reqBody.releaseDate || "");
        this.setKindId(reqBody.kindId || 0);
        this.setEditorId(reqBody.editorId || 0);
        if(Object.keys(reqBody).length === 0) {
            this.#favorite = false;
        }else{
            if(reqBody.highlighting !== undefined){
                if(Object.keys(reqBody.highlighting).length > 0){
                    this.#favorite = true;
                }else{
                    this.#favorite = false;
                }
            }else{
                this.#favorite = true;
            }
        }
        this.setImage(reqBody.image || "");

    }

    toJson() {
        return {
            name: this.#name,
            desc: this.#desc,
            releaseDate: this.#releaseDate,
            kindId: this.#kindId,
            editorId: this.#editorId
        };
    }

    setId(id){
        id = parseInt(id);
        if(!this.#error.isValidNumber(id)){
            this.#error.pushError("id", "L'id est incorrect");
            return;
        }
        this.#id = id;
    }
    setName(name){
        if(!this.#error.isValidString(name)){
            this.#error.pushError("name", "Le nom du Jeu est inccorect")
            return;
        }
        this.#name = name;
    }
    setDesc(desc){
        if(!this.#error.isValidString(desc)){
            this.#error.pushError("desc", "La description du Jeu est inccorect")
            return;
        }
        this.#desc = desc;
    }
    setReleaseDate(releaseDate){
        if(typeof releaseDate === "string"){
            releaseDate = new Date(releaseDate);
        }
        if(!this.#error.isValidDate(releaseDate)){
            this.#error.pushError("releaseDate", "La date de sortie Jeu est inccorect")
            return;
        }
        this.#releaseDate = releaseDate;
    }
    setKindId(kindId){
        kindId = parseInt(kindId);
        if (!this.#error.isValidNumber(kindId) || kindId > 6) {
            this.#error.pushError("kindId", "Le genre du jeux est inccorect")
            return;
        }
        this.#kindId = kindId;
    }
    setEditorId(editorId){
        editorId = parseInt(editorId);
        if(!this.#error.isValidNumber(editorId)){
            this.#error.pushError("editorId", "L'étiteur du Jeu est inccorect")
            return;
        }
        this.#editorId = editorId;
    }
    setImage(img) {

    }
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get desc() {
        return this.#desc;
    }

    get releaseDate() {
        return this.#releaseDate;
    }

    get kindId() {
        return this.#kindId;
    }

    get editorId() {
        return this.#editorId;
    }
    get favorite(){
        return this.#favorite;
    }
    get image(){
        return this.#image;
    }
    /**
     *
     * @returns CustomError
     */
    get error(){
        return this.#error;
    }


}
module.exports = Game;