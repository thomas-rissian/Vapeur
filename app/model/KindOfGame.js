const CustomError = require("./Error");
class KindOfGame{
    #id = 0;
    #name = "";
    #error;
    constructor(reqBody ={}){
        this.#error = new CustomError();
        if (reqBody.id) this.setId(reqBody.id);
        this.setName(reqBody.name || "");
    }

    toJson() {
        return {
            name: this.#name,
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
            this.#error.pushError("name", "Le nom de l'éditeur est inccorect")
            return;
        }
        this.#name = name;
    }
    get id(){
        return this.#id;
    }
    get name(){
        return this.#name;
    }

    /**
     *
     * @returns CustomError
     */
    get error(){
        return this.#error;
    }
}
module.exports = KindOfGame;