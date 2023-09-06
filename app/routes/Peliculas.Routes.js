let Express = require('express');
let Router = Express.Router();
let {GetMovies, CreateMovies, UpdateMovies,DeletePeliculas, DetallePeliculas } = require('../Controllers/peliculas.controller');

Router.get('/Peliculas', GetMovies);
Router.post('/Peliculas', CreateMovies);
Router.put('/Peliculas/:id', UpdateMovies);
Router.delete('/Peliculas/:id', DeletePeliculas);
Router.get('/DetallePeliculas/:id', DetallePeliculas);


module.exports = Router;