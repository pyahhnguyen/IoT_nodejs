const express = require('express');
const {GetRelaciones} = require('../Controllers/relaciones.controller')
const Router = express.Router();

Router.get('/Relaciones', GetRelaciones );

module.exports = Router;
