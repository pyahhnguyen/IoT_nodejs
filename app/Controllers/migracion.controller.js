let {Pool, PoolServer} = require('../Database/index');

class MigracionExtraer{

    async extraerdatos(req, res){
       const queryextraer = `select * from public.uleamsensors`;
       const dataextra = await PoolServer.query(queryextraer);
       for await (const data of dataextra.rows) {
        
        const insertardatos = `insert into sparksiot.uleamsensors
        (
        timestamp,
        basetimestamp,
        fechahora,
        tem,
        hum,
        pre,
        alt,
        pm1,
        pm25,
        pm40,
        pm10,
        o3,
        co,
        no,
        no2,
        so2,
        latitud,
        longitud,
        name)
        values (
            ${data.timestamp},
            ${data.basetimestamp},
            ${data.fechahora},
            ${data.tem},
            ${data.hum},
            ${data.pre},
            ${data.alt},
            ${data.pm1},
            ${data.pm25},
            ${data.pm40},
            ${data.pm10},
            ${data.o3},
            ${data.co},
            ${data.no},
            ${data.no2},
            ${data.so2},
            ${data.latitud},
            ${data.longitud},
            ${data.name}
        ) returning id `
        const {rows} = await Pool.query(insertardatos);
        console.log('INGRESANDO DATOS');
       }
       return {
        msg:'datos extraidos con exito',
        status:202
       }
    }

}

const MigracionEx = new MigracionExtraer();
module.exports = MigracionEx