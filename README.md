# Convertisseur web de devises [![Build Status](https://travis-ci.org/lsmod/oclock-test.svg?branch=master)](https://travis-ci.org/lsmod/oclock-test)

Test technique pour O'Clock (spécialité Javascript).\
Demo en ligne: https://lsmod.github.io/oclock-test/

_Projet créé avec (l'incontournable) [Create React App](https://github.com/facebook/create-react-app)._ \
_Déployé avec travis & github pages_

## Initialisation du projet

```bash
cd oclock-test/
npm install
```

## Développement / Lancer l'application

```bash
npm start
```

`npm start` lance l'application qui sera accessible en navigateur depuis l'adresse: [http://localhost:3000](http://localhost:3000)

L'application tournera avec le **hot-reloading** activé.
Ce qui veut dire que à chaque changement enregistré dans les fichiers source la page est rechargé automatiquement !

_Note:
Commande à exécuter depuis le répertoire du projet (`oclock-test`)._

## Mise en production

```bash
npm run build
```

Construit l'application prête à être déployé avec la taille des fichiers optimisée ([minification](https://fr.wikipedia.org/wiki/Minification))

## Tests

```bash
npm run test
```

Lance les tests unitaires (basé sur la librairie [jest-dom](https://github.com/testing-library/jest-dom)).
