const {Pool} = require('../Database/index');

class RelacionesController{

    async GetRelaciones(req,res){
        let {rows} = await Pool.query(`select u.nombre, r.descripcion, (pe.descripcion) as pelis from users as u
        left join peliculas as pe
    on u.id = pe.idusuario
        inner join roluser as r
    on u.id = r.idusuario
    `);
        res.status(200).
        json({
            status:'ok',
            message:'estamos funcionando',
            data:rows
        })
    }
}
const InstanciaRelaciones = new RelacionesController();

module.exports = InstanciaRelaciones;
