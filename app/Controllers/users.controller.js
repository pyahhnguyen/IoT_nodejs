let {Pool} = require('../Database/index');
const { eliminacionlogicauser, updateuser } = require('../Database/querys/users');

class user{

    async EditUser(req, res){
        let { nombre, apellido,correo, telefono} = req.body;
        let userupdated = {nombre, apellido, correo, telefono};
        let {id} = req.params; 
        
        let queryupdate = updateuser(userupdated, id);
        let {rows} = await Pool.query(queryupdate)
        try {
            if (rows.length <= 0 ) {
                return res.status(303)
                .json({
                    message:"Usuario no pudo ser actualizado correctamente",
                    icon:"warning"
                })
            }
            return res.status(200)
            .json({
                message:"Usuario Actualizado correctamente",
                icon:"success"
            }); 
        } catch (error) {
            return res.status(500)
            .json({
                message:"Ocurrió un error, contacte con el administrador",
                icon:"error"
            });
        }
        
    }
    async DeleteUser(req, res){

        try {
                let {id} = req.params;
            let querydelete = eliminacionlogicauser(id);
            let {rows} = await Pool.query(querydelete);
            if (rows.length <= 0 ) {
                return res.status(303)
                .json({
                    message:"Usuario no fue eliminado correctamente",
                    icon:"warning"
                })
            }
            return res.status(200)
            .json({
                message:"Usuario Eliminado correctamente",
                icon:"success"
            });   
        } catch (error) {
            return res.status(500)
            .json({
                message:"Ocurrió un error, contacte con el administrador",
                icon:"error"
            });
        }
        
    }

}
let userInstan = new user()
module.exports = userInstan;