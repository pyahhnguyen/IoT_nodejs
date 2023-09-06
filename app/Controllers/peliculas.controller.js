const Pool = require('../Database');
let {GetPeliculas} = require('../services/peliculas.services');

class peliculascontroller{

    async GetMovies(req, res){
    try {
        let datos = await GetPeliculas();
        console.log(datos);
        res.status(200).
        json({
         status:'ok',
         message:'estamos funcionando',
         data:datos
     })  
    } catch (error) {
        console.log(error);
    }
      
    }

    async DetallePeliculas(req, res){

        let {id} = req.params;
        try {
            let {rows} = await Pool.query(`
            select * from peliculas as pe
                inner join detallepelicula as dep
            on pe.id = dep.idpelicula where pe.id = ${id}`);
            if (rows.length < 0 ) {
                res.status(404).json({
                    message:'no se pudo encontrar la pelicula'
                })
            }
            res.status(200).json({
                message:'Pelicula Encontrada correctamente',
                data:rows
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:'Existió un erorr al momento de buscar el detalle de la pelicula',
                error: error.message
            })
        }
    }

    async CreateMovies(req, res){
        let {descripcion, titulo, genero} = req.body;
        try {
            let {rows} = 
            await Pool.query(`insert into peliculas 
                            (descripcion, titulo, genero) values($1, $2, $3) returning id`,
                            [descripcion, titulo, genero]);
            if (rows.length < 0 ) {
                res.status(500).json({
                    message:'no se pudo ingresar la pelicula'
                })
            }
            res.status(200).json({
                message:'Pelicula Ingresada correctamente',
                data:rows
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:'Existió un erorr y no se pudo crear la pelicula',
                error: error.message
            })
        }
    }
    async UpdateMovies(req, res){

        let {descripcion, titulo, genero} = req.body;
        let {id} = req.params;
        let updateMovie = await Pool.query(`update peliculas set descripcion = $1, 
        titulo = $2, genero = $3 where id = $4 returning id`, [ descripcion, titulo, genero, id]);
        res.status(201).json({
            message: 'Pelicula actualizada satisfactoriamente',
            data: updateMovie.rows
        })        
        

    }
    async DeletePeliculas(req, res){

        //delete from peliculas where id =
        let {id} = req.params;
        let deleteMovie = await Pool.query(`delete from peliculas where id = $1 returning id`, [ id ]);
        res.status(201).json({
            message: 'Pelicula borrada satisfactoriamente',
            data: deleteMovie.rows
        })  
    }

}

let PeliculasInstancia = new peliculascontroller();

module.exports = PeliculasInstancia