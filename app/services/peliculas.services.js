let {Pool} = require('../Database/index');

class PeliculasServices{
    
    async GetPeliculas(){
        try {
            let {rows} = await Pool.query('select * from peliculas');
            return rows
        } catch (error) {
            console.log('error');
            console.log(error);
            return error
            
        }
    }
}

let PelisInstanciaservices = new PeliculasServices();

module.exports = PelisInstanciaservices;