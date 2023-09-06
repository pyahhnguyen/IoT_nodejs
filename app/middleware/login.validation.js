let {validationResult} = require('express-validator')

class LoginValidation {
    
    RegisterValidation(req, res, next){
    
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({error:error.array()});
        }
        next();
           
    }
}

let InstanciaValidation = new LoginValidation()
module.exports = InstanciaValidation;