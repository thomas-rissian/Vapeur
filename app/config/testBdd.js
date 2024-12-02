const { PrismaClient } = require('@prisma/client');
const { initDb } = require('./initDb'); // Importer la fonction initDb
const prisma = new PrismaClient();

async function resetDb() {
    // Supprimer toutes les données de la base de données
    await prisma.highlighting.deleteMany({});
    await prisma.game.deleteMany({});
    await prisma.editor.deleteMany({});
    await prisma.kindOfGame.deleteMany({});

    console.log('Base de données réinitialisée.');
}

async function seed() {
    // Réinitialiser la base de données
    await resetDb();

    // Initialiser les genres dans la base de données
    await initDb();

    // Récupérer les genres récemment créés
    const kindOfGames = await prisma.kindOfGame.findMany();

    const actionGenre = kindOfGames.find(kind => kind.name === 'Action');
    const adventureGenre = kindOfGames.find(kind => kind.name === 'Aventure');
    const rpgGenre = kindOfGames.find(kind => kind.name === 'RPG');
    const simulationGenre = kindOfGames.find(kind => kind.name === 'Simulation');
    const sportGenre = kindOfGames.find(kind => kind.name === 'Sport');
    const mmorpgGenre = kindOfGames.find(kind => kind.name === 'MMORPG');

    // Créer des éditeurs
    const editor1 = await prisma.editor.create({
        data: { name: 'Nintendo' }
    });
    const editor2 = await prisma.editor.create({
        data: { name: 'Sony' }
    });
    const editor3 = await prisma.editor.create({
        data: { name: 'Microsoft' }
    });
    const editor4 = await prisma.editor.create({
        data: { name: 'Ubisoft' }
    });

    // Créer 20 jeux avec les 6 genres
    const games = [
        { name: 'The Legend of Zelda: Breath of the Wild', desc: 'Un jeu d\'action-aventure', releaseDate: new Date('2017-03-03'), kindId: actionGenre.id, editorId: editor1.id },
        { name: 'God of War', desc: 'Un jeu d\'action-RPG', releaseDate: new Date('2018-04-20'), kindId: rpgGenre.id, editorId: editor2.id },
        { name: 'Minecraft', desc: 'Jeu de construction et survie', releaseDate: new Date('2011-11-18'), kindId: adventureGenre.id, editorId: editor3.id },
        { name: 'Assassin\'s Creed Valhalla', desc: 'Jeu d\'aventure en monde ouvert', releaseDate: new Date('2020-11-10'), kindId: adventureGenre.id, editorId: editor4.id },
        { name: 'Horizon Zero Dawn', desc: 'Jeu d\'aventure avec un environnement ouvert', releaseDate: new Date('2017-02-28'), kindId: adventureGenre.id, editorId: editor2.id },
        { name: 'Dark Souls III', desc: 'Jeu d\'action-RPG difficile', releaseDate: new Date('2016-04-12'), kindId: rpgGenre.id, editorId: editor4.id },
        { name: 'Red Dead Redemption 2', desc: 'Jeu d\'aventure en monde ouvert', releaseDate: new Date('2018-10-26'), kindId: adventureGenre.id, editorId: editor3.id },
        { name: 'The Witcher 3: Wild Hunt', desc: 'Jeu de rôle en monde ouvert', releaseDate: new Date('2015-05-19'), kindId: rpgGenre.id, editorId: editor4.id },
        { name: 'Super Mario Odyssey', desc: 'Jeu de plateforme 3D', releaseDate: new Date('2017-10-27'), kindId: actionGenre.id, editorId: editor1.id },
        { name: 'Fortnite', desc: 'Jeu de battle royale', releaseDate: new Date('2017-07-25'), kindId: actionGenre.id, editorId: editor3.id },
        { name: 'GTA V', desc: 'Jeu d\'action-aventure', releaseDate: new Date('2013-09-17'), kindId: adventureGenre.id, editorId: editor3.id },
        { name: 'Sekiro: Shadows Die Twice', desc: 'Jeu d\'action-RPG', releaseDate: new Date('2019-03-22'), kindId: rpgGenre.id, editorId: editor2.id },
        { name: 'Uncharted 4: A Thief\'s End', desc: 'Jeu d\'aventure', releaseDate: new Date('2016-05-10'), kindId: adventureGenre.id, editorId: editor2.id },
        { name: 'The Elder Scrolls V: Skyrim', desc: 'Jeu de rôle en monde ouvert', releaseDate: new Date('2011-11-11'), kindId: rpgGenre.id, editorId: editor4.id },
        { name: 'Call of Duty: Modern Warfare', desc: 'Jeu de tir à la première personne', releaseDate: new Date('2019-10-25'), kindId: actionGenre.id, editorId: editor3.id },
        { name: 'Cyberpunk 2077', desc: 'Jeu de rôle futuriste', releaseDate: new Date('2020-12-10'), kindId: rpgGenre.id, editorId: editor4.id },
        { name: 'Animal Crossing: New Horizons', desc: 'Jeu de simulation de vie', releaseDate: new Date('2020-03-20'), kindId: simulationGenre.id, editorId: editor1.id },
        { name: 'Bloodborne', desc: 'Jeu d\'action-RPG', releaseDate: new Date('2015-03-24'), kindId: rpgGenre.id, editorId: editor2.id },
        { name: 'Spiderman: Miles Morales', desc: 'Jeu d\'action-aventure', releaseDate: new Date('2020-11-12'), kindId: actionGenre.id, editorId: editor2.id },
        { name: 'Doom Eternal', desc: 'Jeu de tir à la première personne', releaseDate: new Date('2020-03-20'), kindId: actionGenre.id, editorId: editor3.id },
        { name: 'FIFA 21', desc: 'Jeu de sport', releaseDate: new Date('2020-10-09'), kindId: sportGenre.id, editorId: editor1.id },
        { name: 'NBA 2K21', desc: 'Jeu de sport', releaseDate: new Date('2020-09-04'), kindId: sportGenre.id, editorId: editor4.id }
    ];

    // Insertion des jeux dans la base de données
    for (const game of games) {
        await prisma.game.create({
            data: game
        });
    }

    console.log('Les jeux ont été ajoutés à la base de données.');
}

seed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
