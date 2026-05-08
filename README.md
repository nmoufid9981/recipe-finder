🍽️ What2Cook

What2Cook est une application web full stack qui permet de trouver des idées de recettes à partir d’ingrédients disponibles.

⚙️ Stack
Frontend : React + Tailwind CSS
Backend : Spring Boot (REST API)
DB : MySQL / PostgreSQL
Outils : Git, GitHub, Postman
✨ Fonctionnalités
🔍 Recherche de recettes par ingrédients
🍲 Liste des recettes
📄 Détails d’une recette (ingrédients + étapes)
⭐ Favoris utilisateur
👤 Authentification (login/register)
🧠 API principale
GET /recipes
GET /recipes/{id}
GET /recipes/search?ingredients=
POST /login
POST /register
🚀 Lancer le projet

Backend

mvn spring-boot:run

Frontend

npm install
npm run dev
🎯 Objectif

Simplifier la question : “Qu’est-ce que je peux cuisiner maintenant ?”
