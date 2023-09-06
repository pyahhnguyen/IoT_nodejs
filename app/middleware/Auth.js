let tokenlibrary = require('jsonwebtoken')
let {SECRET_KEY} = require('../config');

class AuthMiddelware{
    
    
    AuthToken(req, res, next){

        try {
            let header = req.headers.authorization;
            if(header === null || header === undefined) return res.status(401).json({status:401, msg:'unauthorization'})
            
            let token = header.split(' ')[1];     
            tokenlibrary.verify(token, SECRET_KEY, (err, decoded)=>{
                if (err) {
                    res.status(400).json({
                        status:400,
                        message:'token invalido',
                        tokenvalid:false
                    })
                }
                next();
            })    
        } catch (error) {
        
            res.status(500).json({
                status:500,
                message:'Ocurrió un error en el servidor, contacte con sistemas',
                tokenvalid:false
            })
        }
        
       
    }
    VerifyToken(req){
        
        let header = req.headers.authorization;
        if(header === null || undefined) return {status:401, msg:'unauthorization'}
        let token = header.split(' ')[1];
        return token;       

    }
}
let InstanciaAuth = new AuthMiddelware();
module.exports = InstanciaAuth