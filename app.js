const express = require('express');
const path = require('path');
const morgan = require('morgan');
const index = require('./routes');
const errorHandler = require('errorhandler');

require('./database');

const app = express();
const port = process.env.PORT || 3000;

// Express va aller chercher dans le dossier views par défaut
// lorsqu'une vue lui sera demandée par la méthode render()
app.set('views', path.join(__dirname, 'views'));
// Définition du template engine
app.set('view engine', 'pug');

// Affiche les logs
app.use(morgan('short'));

// Permet de servir les ressources statiques tels que les images, scripts js, css etc...
app.use(express.static(path.join(__dirname, 'public')));

// Permet de parser le body des requêtes
// pour le format json : récupère les données au format json et les deserialize sous forme d'objet
app.use(express.json());
// pour le format x-www-form-urlencoded : récupère des paires clé/valeur dans l'url et les deserialize sous
// forme d'objet
app.use(express.urlencoded({ extended: true }));

// Utilise le fichier index.js du dossier routes pour le routing
app.use(index);

if (process.env.NODE_ENV === 'development') {
   app.use(errorHandler());
} else {
   app.use((err, req, res, next) => {
      const code = err.code || 500;
      res.status(code).json({
         code,
         message: code === 500 ? null : err.message
      });
   }) 
};

app.listen(port);