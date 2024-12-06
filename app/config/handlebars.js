const hbs = require("hbs");
const path = require("path");
//dossier vue / partials
hbs.registerPartials(path.join(__dirname, "../views", "partials"));
//condition
hbs.registerHelper('ifEqual', function (a, b, options) {
    return parseInt(a) === parseInt(b) ? options.fn(this) : options.inverse(this);
});
// si n'est pas vide
hbs.registerHelper('ifContain', function (obj, options) {
    // Vérifie si l'objet a des clés
    if (obj && Object.keys(obj).length > 0) {
        return options.fn(this); // Si l'objet contient des clés, exécute le bloc {{#ifContain}}
    } else {
        return options.inverse(this); // Sinon, exécute le bloc {{else}}
    }
});
// Formatage en dd/mm/yyyy
hbs.registerHelper("formatDate", (date) => {
    return date.toLocaleDateString();
});

// Formatage en yyyy-mm-dd
hbs.registerHelper("formatDateCalendar", (date) => {
    const day = String(date.getDate()).padStart(2, '0');// oblige 2 chiffre
    const month = String(date.getMonth() + 1).padStart(2, '0'); // index +1
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
});
//concaténation chaine
hbs.registerHelper("concat", (...args) => {
   args.pop();
   let concat = "";
   for(const arg of args){
       concat+= arg;
   }
    return concat;
});


module.exports = {hbs};