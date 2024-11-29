# VAPEUR
## Description
Projet Web Javascript, CRUD sur un site de listening de jeux vidéo


## Commandes 

- `npm install express`
- `npm install --save-dev nodemon`
- `npm install prisma @prisma/client sqlite3`
- `npx prisma init`
- `npm install hbs`

## Configuration 

Créez / modifiez le fichier .env
Ajoutez : `DATABASE_URL="file:./database.db"`

Après modification de la bdd, veuillez appliquez les modifications : 

- `npx prisma migrate dev --name init`

Afin de générer le client : 

- `npx prisma generate`

## Utilisation

Pour démarrer le serveur : 

- `npm start`
- `localhost:3080`