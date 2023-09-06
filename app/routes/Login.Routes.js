let Express = require('express');
let Router = Express.Router();
let {RegisterValidation} = require('../middleware/login.validation');
let Validationregister = require('../Validation/ValidationRegister');
let {AuthToken} = require('../middleware/Auth')
let {login, Register, GetRol, logout, verifyToken, GetUser} = require('../Controllers/login.controller');
const {extraerdatos} = require('../Controllers/migracion.controller');


Router.post('/login', login);
Router.post('/logout', logout);
Router.post('/register', Validationregister ,RegisterValidation, Register);
Router.get('/permisos/:id', GetRol);
Router.get('/listausers', GetUser);
Router.get('/Migrar', extraerdatos);

module.exports = Router;