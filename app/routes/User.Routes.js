let Express = require('express');
let Router = Express.Router();
let {EditUser, DeleteUser} = require('../Controllers/users.controller')

Router.put('/EditUser/:id', EditUser);
Router.put('/DeleteUser/:id', DeleteUser);
Router.get('/Getuser', (req, resp)=>{
    
    console.log('los header');
    let header = req.headers.authorization;
    let token = header.split(' ')[1];
    console.log('this is the fucking token');
    console.log(token);
})

module.exports = Router;