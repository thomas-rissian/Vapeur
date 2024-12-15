// Remplacer `import` par `require`
const { PrismaClient } = require('@prisma/client');

// Créer une instance du client Prisma
const prisma = new PrismaClient();

async function main() {
    // Suppression des anciennes données
    console.log("Suppression des anciennes données...");
    await prisma.highlighting.deleteMany({});
    await prisma.game.deleteMany({});
    await prisma.kindOfGame.deleteMany({});
    await prisma.editor.deleteMany({});

    // Création des genres
    console.log("Création des genres...");
    await prisma.kindOfGame.createMany({
        data: [
            { id: 1, name: "Action" },
            { id: 2, name: "Aventure" },
            { id: 3, name: "RPG" },
            { id: 4, name: "Simulation" },
            { id: 5, name: "Sport" },
            { id: 6, name: "MMORPG" },
        ],
    });

    // Création des éditeurs
    console.log("Création des éditeurs...");
    await prisma.editor.createMany({
        data: [
            { id: 1, name: "Epic Games" },
            { id: 2, name: "Ubisoft" },
            { id: 3, name: "Bethesda" },
            { id: 4, name: "Electronic Arts" },
            { id: 5, name: "Square Enix" },
        ],
    });

    // Création des jeux
    console.log("Création des jeux...");
    const gamesData = [
        { name: "Fortnite", desc: "Battle Royale Game", releaseDate: new Date('2017-07-25'), kindId: 1, editorId: 1 },
        { name: "Assassin's Creed", desc: "Historical Action Game", releaseDate: new Date('2007-11-13'), kindId: 2, editorId: 2 },
        { name: "The Elder Scrolls V: Skyrim", desc: "Epic RPG", releaseDate: new Date('2011-11-11'), kindId: 3, editorId: 3 },
        { name: "The Sims 4", desc: "Life Simulation", releaseDate: new Date('2014-09-02'), kindId: 4, editorId: 4 },
        { name: "FIFA 23", desc: "Football Simulation", releaseDate: new Date('2022-09-30'), kindId: 5, editorId: 4 },
        { name: "Final Fantasy XIV", desc: "Popular MMORPG", releaseDate: new Date('2010-09-30'), kindId: 6, editorId: 5 },
        { name: "Overwatch", desc: "Team-based Action Game", releaseDate: new Date('2016-05-24'), kindId: 1, editorId: 1 },
        { name: "Far Cry 5", desc: "First-person Adventure Game", releaseDate: new Date('2018-03-27'), kindId: 2, editorId: 2 },
        { name: "Fallout 4", desc: "Post-apocalyptic RPG", releaseDate: new Date('2015-11-10'), kindId: 3, editorId: 3 },
        { name: "SimCity", desc: "City-building Simulation", releaseDate: new Date('2013-03-05'), kindId: 4, editorId: 4 },
        { name: "NBA 2K23", desc: "Basketball Simulation", releaseDate: new Date('2022-09-09'), kindId: 5, editorId: 4 },
        { name: "World of Warcraft", desc: "Classic MMORPG", releaseDate: new Date('2004-11-23'), kindId: 6, editorId: 5 },
        { name: "Call of Duty: Warzone", desc: "Battle Royale FPS", releaseDate: new Date('2020-03-10'), kindId: 1, editorId: 1 },
        { name: "Prince of Persia", desc: "Platform Adventure Game", releaseDate: new Date('1989-10-03'), kindId: 2, editorId: 2 },
        { name: "Cyberpunk 2077", desc: "Futuristic RPG", releaseDate: new Date('2020-12-10'), kindId: 3, editorId: 3 },
        { name: "Planet Zoo", desc: "Zoo Management Simulation", releaseDate: new Date('2019-11-05'), kindId: 4, editorId: 4 },
        { name: "Madden NFL 23", desc: "American Football Simulation", releaseDate: new Date('2022-08-19'), kindId: 5, editorId: 4 },
        { name: "Guild Wars 2", desc: "Fantasy MMORPG", releaseDate: new Date('2012-08-28'), kindId: 6, editorId: 5 },
        { name: "Halo Infinite", desc: "Sci-fi Action Game", releaseDate: new Date('2021-12-08'), kindId: 1, editorId: 1 },
        { name: "Tomb Raider", desc: "Adventure and Exploration", releaseDate: new Date('2013-03-05'), kindId: 2, editorId: 2 },
        { name: "Apex Legends", desc: "Battle Royale FPS", releaseDate: new Date('2019-02-04'), kindId: 1, editorId: 1 },
        { name: "Minecraft", desc: "Sandbox Adventure Game", releaseDate: new Date('2011-11-18'), kindId: 2, editorId: 3 },
        { name: "The Witcher 3: Wild Hunt", desc: "Fantasy RPG", releaseDate: new Date('2015-05-19'), kindId: 3, editorId: 3 },
        { name: "RollerCoaster Tycoon", desc: "Theme Park Simulation", releaseDate: new Date('1999-03-31'), kindId: 4, editorId: 4 },
        { name: "PES 2021", desc: "Football Simulation", releaseDate: new Date('2020-09-15'), kindId: 5, editorId: 4 },
        { name: "Black Desert Online", desc: "Fantasy MMORPG", releaseDate: new Date('2015-07-14'), kindId: 6, editorId: 5 },
        { name: "Valorant", desc: "Tactical Shooter", releaseDate: new Date('2020-06-02'), kindId: 1, editorId: 1 },
        { name: "Red Dead Redemption 2", desc: "Western Adventure Game", releaseDate: new Date('2018-10-26'), kindId: 2, editorId: 2 },
        { name: "Stardew Valley", desc: "Farming RPG", releaseDate: new Date('2016-02-26'), kindId: 3, editorId: 3 },
    ];

    const insertedGames = await Promise.all(
        gamesData.map((game) => prisma.game.create({ data: game }))
    );

    console.log("Création des highlights...");
    // Ajouter au moins 10 jeux dans les highlights
    const highlightGames = insertedGames.slice(0, 10); // Les 10 premiers jeux
    await prisma.highlighting.createMany({
        data: highlightGames.map((game) => ({ gameId: game.id })),
    });

    console.log("Données insérées avec succès !");
}

// Exécution de la fonction main
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
