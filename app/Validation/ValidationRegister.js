let {body,check} = require('express-validator');
const {Pool} = require('../Database');
let {searchemail} = require('../Database/querys/login.query');

async function ValidationUser(email) {
    let queryuser = searchemail(email);
    let {rows} = await Pool.query(queryuser);
    if (rows.length >0) {
        return Promise.reject(`El correo ${email} ya se encuentra asociado a una cuenta`)
    }
}

module.exports = [
    check('email').isEmail()
    .withMessage('El correo ingresado no es valido, favor revise su correo e intente denuevo'),
    check('email').custom(ValidationUser),
    check('password')
    .isLength({min:8})
    .withMessage('Contraseña debe contener almenos 8 caracteres especiales')
    .isAlphanumeric()
    .withMessage('La contraseña debe estar formada por numeros y letras')
]