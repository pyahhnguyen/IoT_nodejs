let token = require('jsonwebtoken');
let {SECRET_KEY} = require('../config');


class loginhandlers{

    GenerateToken(user){
        let tokensaved = token.sign(user, SECRET_KEY, {expiresIn:'24h'});
        return tokensaved
    }

}

let Instaint = new loginhandlers();
module.exports = Instaint;