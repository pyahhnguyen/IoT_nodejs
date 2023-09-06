// estos son los querys para la base de datos

module.exports = {
    
    registerquery(user, token){
        let {nombre, apellido, newpassword, email, telefono} = user;
        return `insert into sparksiot.users (nombre, apellido, password, email, token, telefono, estado) 
            values('${nombre}', '${apellido}', '${newpassword}', '${email}', '${token}' , '${telefono}', '${true}')
        RETURNING id, password, nombre, token`
    },
    searchemail(email){
        return `select token, password, nombre, email, id from sparksiot.users where email = '${email}' `
    },
    registerrol(idrol, iduser){
        return `insert into sparksiot.roluser(idrol, idusuario) values ('${idrol}', '${iduser}')
            RETURNING idusuario`
    },
    obtenerusuarios(){
        return `select u.id, (u.nombre  || ' ' || u.apellido) as usuario,
        u.email as correo, u.telefono, 
        CASE
            WHEN u.estado = true
                THEN 'Activo'
            ELSE 'Desactivado'
        END as estado, r.descripcion
        from sparksiot.users as u
        inner join sparksiot.roluser as ru
            on u.id = ru.idusuario
        inner join sparksiot.rol as r
            on ru.idrol = r.id`
    },
    obtenerusuarioslogin(id){
        return `select u.id, u.nombre ,u.apellido,
        u.email as correo, u.telefono, 
        CASE
            WHEN u.estado = true
                THEN 'Activo'
            ELSE 'Desactivado'
        END as estado, r.descripcion
        from sparksiot.users as u
        inner join sparksiot.roluser as ru
            on u.id = ru.idusuario
        inner join sparksiot.rol as r
            on ru.idrol = r.id
            where u.id = '${id}'`
    }

}