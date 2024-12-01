class Error{
    #errors;

    constructor(){
        this.#errors = [];
    }

    getErrors(){
        return this.#errors;
    }
    hasError(){
        return this.#errors.length>0;
    }
    pushError(field, message){
        this.#errors.push({
            field: field,
            message: message,
        })
    }  
    isValidString(value) {
        return !this.isNull(value) && typeof value === "string" && value.trim() !== "";
    }

    isValidNumber(value) {
        return !this.isNull(value) && typeof value === "number" && value > 0;
    }

    isValidDate(value) {
        return !this.isNull(value) && value instanceof Date && !isNaN(value);
    }
    isNull(value) {
        return value === null || value === undefined;
    }

    
}
module.exports = Error;