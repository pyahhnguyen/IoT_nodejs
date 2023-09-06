module.exports = {
    registersensor(sensor){
        let {elementoquimico, descripcion, imagen} = sensor;
        return `insert into sparksiot.sensors (elemento_quimico, descripcion, estado, img)
        values ('${elementoquimico}', '${descripcion}','true' ,'${imagen}')
        RETURNING id`
    },
    lissensors(){
        return `select * from sparksiot.sensors where estado = true`
    },
    lissensorsbad(){
        return `select * from sparksiot.sensors where estado = false`
    },
    eliminacionlogica(id){
        return `update sparksiot.sensors set estado = false where id = '${id}'
            RETURNING id`
    },
    shearbyname(elementoquimico){
        return `select * from sparksiot.sensors
            where elemento_quimico = '${elementoquimico}'`        
    },
    updatesensor(sensor, id){
        let {elementoquimico, descripcion, imagen} = sensor;
        return `update sparksiot.sensors set descripcion = '${descripcion}',
                    elemento_quimico = '${elementoquimico}' , img = '${imagen}'
                where id = ${id}
                RETURNING id;`
    }

}