let Express = require('express');
let Router = Express.Router();
let {RegisterSensors, ListaSensors, DeleteSensors, UpdateSensor, ListaSensorsbad} = require('../Controllers/sensors.controller')
let {insertdatasensors, verificardatos,insertarconsolidados} = require('../Controllers/detamigration')
let {verifyToken} = require('../Controllers/login.controller');


Router.post('/registersensor',RegisterSensors);
Router.get('/listsensor' ,ListaSensors);
Router.get('/listsensorbad',ListaSensorsbad);
Router.put('/deletelogic/:id', DeleteSensors);
Router.put('/UpdateSensor/:id', UpdateSensor);
Router.get('/insertdatasensors', insertdatasensors);
Router.post('/verificardatos' ,verificardatos);
Router.get('/insertarconsolidados' ,insertarconsolidados);

module.exports = Router