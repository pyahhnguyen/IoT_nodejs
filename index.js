const Express = require('express');
const cors = require('cors');
const app = Express();
const RouterPeliculas = require('./app/routes/Peliculas.Routes');
const RouterRelaciones = require('./app/routes/Relaciones.Routes');
const RouterLogin = require('./app/routes/Login.Routes');
const RouterSensors = require('./app/routes/Sensors.Routes');
const RouterUser = require('./app/routes/User.Routes');
const cookie = require('cookie-parser');
const { APPPORT } = require('./app/config');

const corsOptions = {
    origin: '*', // Cambia esto al dominio que deseas permitir
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  };

app.use(cors({
    origin:'*'
}));


app.use(Express.json());
app.use(cookie());
app.use(RouterPeliculas, RouterRelaciones); 
app.use(RouterLogin);
app.use(RouterSensors);
app.use(RouterUser);

app.listen(APPPORT, ()=>{
    console.log(` estamos corriendo en el puerto ${APPPORT}`)
})


