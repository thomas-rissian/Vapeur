const hbs = require("hbs");
const path = require("path");
//condition
hbs.registerHelper('ifEqual', function (a, b, options) {
    return parseInt(a) === parseInt(b) ? options.fn(this) : options.inverse(this);
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

//dossier vue / partials
hbs.registerPartials(path.join(__dirname, "/app/views", "/app/views/partials"));

module.exports = {hbs};