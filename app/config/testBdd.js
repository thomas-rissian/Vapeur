const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    try {
        // Supprimer les données existantes pour éviter les conflits
        console.log("Nettoyage des anciennes données...");
        await prisma.highlighting.deleteMany();
        await prisma.game.deleteMany();
        await prisma.editor.deleteMany();
        await prisma.kindOfGame.deleteMany();

        // Initialisation des données de test
        console.log("Ajout des données de test...");

        // Genres de jeu
        const kinds = await prisma.kindOfGame.createMany({
            data: [
                { name: "Action" },
                { name: "Aventure" },
                { name: "RPG" },
                { name: "Simulation" },
                { name: "Stratégie" },
                { name: "Sport" },
            ],
        });
        console.log(`${kinds.count} genres de jeux ajoutés.`);

        // Éditeurs
        const editors = await prisma.editor.createMany({
            data: [
                { name: "Nintendo" },
                { name: "Sony" },
                { name: "Ubisoft" },
                { name: "EA Games" },
            ],
        });
        console.log(`${editors.count} éditeurs ajoutés.`);

        // Récupérer les IDs des genres et éditeurs pour créer les jeux
        const [action, aventure, rpg] = await prisma.kindOfGame.findMany({
            where: { name: { in: ["Action", "Aventure", "RPG"] } },
        });

        const [nintendo, sony, ubisoft] = await prisma.editor.findMany({
            where: { name: { in: ["Nintendo", "Sony", "Ubisoft"] } },
        });

        // Jeux
        const games = await prisma.game.createMany({
            data: [
                {
                    name: "Zelda: Breath of the Wild",
                    desc: "Un jeu d'aventure en monde ouvert.",
                    releaseDate: new Date('2017-03-03'),
                    kindId: aventure.id,
                    editorId: nintendo.id,
                },
                {
                    name: "The Last of Us",
                    desc: "Un jeu d'action-aventure post-apocalyptique.",
                    releaseDate: new Date('2013-06-14'),
                    kindId: action.id,
                    editorId: sony.id,
                },
                {
                    name: "Assassin's Creed Valhalla",
                    desc: "Un jeu d'action-RPG dans l'univers des Vikings.",
                    releaseDate: new Date('2020-11-10'),
                    kindId: rpg.id,
                    editorId: ubisoft.id,
                },
            ],
        });
        console.log(`${games.count} jeux ajoutés.`);

        // Récupérer les IDs des jeux pour créer les highlightings
        const [zelda, tlou] = await prisma.game.findMany({
            where: { name: { in: ["Zelda: Breath of the Wild", "The Last of Us"] } },
        });

        // Highlightings
        const highlightings = await prisma.highlighting.createMany({
            data: [
                { gameId: zelda.id },
                { gameId: tlou.id },
            ],
        });
        console.log(`${highlightings.count} mises en avant ajoutées.`);

        console.log("Base de données initialisée avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données :", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Exécuter le script de seed
seed();
