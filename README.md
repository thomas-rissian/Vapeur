# VAPEUR

## 📖 Description

**Vapeur** est un catalogue personnel de jeux vidéo. Cette application permet :  
- L'ajout de nouveaux jeux.  
- La mise en avant de certains titres.  
- La suppression de jeux si nécessaire.  
- Le tri des jeux par genres ou éditeurs.  

---

## 📂 Structure du projet

Le projet inclut les dossiers et fichiers suivants :  
- `/app` : Contient la logique principale de l'application.  
- `/prisma` : Configuration Prisma et migrations pour la base de données.  
- `/public` : Contient les ressources publiques comme les fichiers statiques.  
- `index.js` : Point d'entrée de l'application.  
- `package.json` : Configuration des dépendances et scripts npm.

---

## ⚙️ Installation

1. **Installer les dépendances** :  
   ```bash
   npm install
   ```

2. **Configurer la base de données** :  
   Créez le fichier `.env` à la racine du projet et ajoutez la ligne suivante :  
   ```env
   DATABASE_URL="file:./database.db"
   ```

---

## 🛠️ Commandes de configuration

### 1. Appliquer les migrations de la base de données :
Cette commande est nécessaire si vous modifiez la structure de la base de données ou son emplacement.  
   ```bash
   npx prisma migrate dev
   ```

### 2. Générer le client Prisma :  
   Utilisez cette commande après avoir modifié le fichier `schema.prisma`.  
   ```bash
   npx prisma generate
   ```

---

## 🚀 Utilisation

### 1. Démarrer le serveur :  
   ```bash
   npm start
   ```
   Accédez à l'application via : [http://localhost:3080](http://localhost:3080).

### 2. Insérer des données de test :  
   Pour initialiser la base de données avec des valeurs par défaut ou de test :  
   ```bash
   npm run bddTest
   ```