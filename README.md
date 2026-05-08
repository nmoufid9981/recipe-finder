<div align="center">

#  What2Cook

<img src="https://img.shields.io/badge/Full%20Stack-Projet-blueviolet?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Spring%20Boot-Backend-6DB33F?style=for-the-badge&logo=springboot" />
<img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss" />

---

###  *“Que puis-je cuisiner avec ce que j'ai ?”*

</div>

---

##  À propos du projet

**What2Cook** est une application web full stack qui aide les utilisateurs à trouver des idées de recettes à partir des ingrédients disponibles.

L'objectif est de :
- Simplifier les décisions culinaires quotidiennes
- Réduire le gaspillage alimentaire
- Fournir des suggestions de recettes rapides et pertinentes

---

##  Stack Technique

###  Frontend
- **React** (Bibliothèque UI)
- **Tailwind CSS** (Stylisation)
- **React Router** (Navigation)
- **Axios** (Appels API)

###  Backend
- **Spring Boot** (Framework Java)
- **Spring Data JPA** (Persistance des données)
- **REST API** (Architecture)

###  Base de données
- **MySQL / PostgreSQL**

###  Outils
- **Git & GitHub** (Versionnage)
- **Postman** (Tests API)
- **Maven** (Gestionnaire de dépendances)
- **Node.js** (Environnement d'exécution)

---

##  Fonctionnalités

-  **Recherche par ingrédients** : Trouvez des recettes selon ce que vous avez.
-  **Liste de recettes** : Parcourez l'ensemble des plats disponibles.
-  **Détails de la recette** : Affichez les ingrédients nécessaires et les étapes de préparation.
-  **Favoris** : Ajoutez ou retirez des recettes de votre liste personnelle.
-  **Authentification** : Système complet d'inscription et de connexion.

---

##  Points de terminaison API (Endpoints)

```http
GET    /recipes                       # Récupérer toutes les recettes
GET    /recipes/{id}                  # Détails d'une recette par ID
GET    /recipes/search?ingredients=   # Recherche par liste d'ingrédients
POST   /register                      # Inscription d'un utilisateur
POST   /login                         # Connexion de l'utilisateur
