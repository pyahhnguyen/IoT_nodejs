module.exports = {
    editUser(user){
        let {nombre, apellido, correo, telefono, id} = user;
        return `insert into sparksiot.sensors (elemento_quimico, descripcion, estado, img)
        values ('${elementoquimico}', '${descripcion}','true' ,'img')
        RETURNING id`
    }, 
    lissensors(){
        return `select * from sparksiot.sensors where estado = true`
    },
    eliminacionlogicauser(id){
        return `update sparksiot.users set estado = false where id = '${id}'
            RETURNING id`
    },
    shearbyname(elementoquimico){
        return `select * from sparksiot.sensors
            where elemento_quimico = '${elementoquimico}'`        
    },
    updateuser(user, id){
        let {nombre, apellido,correo, telefono} = user;
        return `update sparksiot.users set nombre = '${nombre}',
                    apellido = '${apellido}', 
                    email = '${correo}'
                    telefono = '${apellido}'
                where id = ${id}
                RETURNING id;`
    }

}