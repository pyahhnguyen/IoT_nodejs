let {Pool} = require('../Database/index');
const moment = require('moment');

class Migracion{

    async insertdatasensors(req, res){

       const selectsensors = 'SELECT id, elemento_quimico  FROM sparksiot.sensors where estado = true'
       const sensorsregisters =  await Pool.query(selectsensors);
       const queryextraer = `SELECT id, DATE(basetimestamp) as fecha, TO_CHAR(basetimestamp, 'HH24:MI:SS') as hora,
       tem, hum, pm1, pm25, pm40, no2, so2 
       FROM sparksiot.uleamsensors
       ORDER BY id asc LIMIT 1500`;
       const dataextra = await Pool.query(queryextraer);

       for await (const sensor of sensorsregisters.rows) {
            console.log('pasa primer for');
            
            for await (const data of dataextra.rows) {
                const dat = moment(data.fecha).format('YYYY-MM-DD')
                // debugger
            if (sensor.elemento_quimico === 'tem') {
                
                const insertatemp = `insert into sparksiot.detasensor (fecha,tiempo, idsensor, valor)
                values ('${dat}', '${data.hora}','${sensor.id}', ${data.tem}) returning id `;
                const {rows} = await Pool.query(insertatemp);
                console.log('INGRESANDO DATOS TEM');
                
                
            }
            if (sensor.elemento_quimico === 'hum') {
                
                const insertatemp = `insert into sparksiot.detasensor (fecha, tiempo, idsensor, valor)
                values ('${dat}', '${data.hora}', '${sensor.id}', ${data.hum}) returning id `
                const {rows} = await Pool.query(insertatemp);
                console.log('INGRESANDO DATOS HUM');

            }
            if (sensor.elemento_quimico === 'pm1') {
                
                const insertatemp = `insert into sparksiot.detasensor (fecha, tiempo, idsensor, valor)
                values ('${dat}', '${data.hora}','${sensor.id}', ${data.pm1}) returning id `
                const {rows} = await Pool.query(insertatemp);
                console.log('INGRESANDO DATOS pm1');

            }
            if (sensor.elemento_quimico === 'pm25') {
                
                const insertatemp = `insert into sparksiot.detasensor (fecha, tiempo, idsensor, valor)
                values ('${dat}', '${data.hora}', '${sensor.id}', ${data.pm25}) returning id `
                const {rows} = await Pool.query(insertatemp);
                console.log('INGRESANDO DATOS pm25');

            }
            if (sensor.elemento_quimico === 'pm40') {
                
                const insertatemp = `insert into sparksiot.detasensor (fecha, tiempo, idsensor, valor)
                values ('${dat}', '${data.hora}', '${sensor.id}', ${data.pm40}) returning id `
                const {rows} = await Pool.query(insertatemp);
                console.log('INGRESANDO DATOS pm40');

            }
            if (sensor.elemento_quimico === 'no2') {
                
                const insertatemp = `insert into sparksiot.detasensor (fecha, tiempo, idsensor, valor)
                values ('${dat}', '${data.hora}', '${sensor.id}', ${data.no2}) returning id `
                const {rows} = await Pool.query(insertatemp);
                console.log('INGRESANDO DATOS n02');

            }
            if (sensor.elemento_quimico === 'so2') {
                
                const insertatemp = `insert into sparksiot.detasensor (fecha, tiempo, idsensor, valor)
                values ('${dat}', '${data.hora}', '${sensor.id}', ${data.so2}) returning id `
                const {rows} = await Pool.query(insertatemp);
                console.log('INGRESANDO DATOS so2');

            }
        }

       }

       const dat2 = moment(sensorsregisters.rows[0].fecha).format('YYYY-MM-DD')

       const insertarultimafecha = `insert into sparksiot.ultimafecha (fecha) values (${dat2})`
       
       const insert = await Pool.query(insertarultimafecha)
       console.log('ultima fecha ingresada');
       console.log(insert.rows);

       
       return {
        msg:'datos extraidos con exito',
        status:202
       }
    }

    fechastringIso(fechaObj){
        const anio = fechaObj.getFullYear();
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
        const dia = String(fechaObj.getDate()).padStart(2, '0');
        const hora = String(fechaObj.getHours()).padStart(2, '0');
        const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
        const segundos = String(fechaObj.getSeconds()).padStart(2, '0');

        // Construir la cadena en formato ISO 8601
        const fechaISO = `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;
        return fechaISO
    }

    async verificardatos(req, res){

        try {
            
            const {body} = req;
            const detas = body.join(',');
            debugger
            const selectsensors = `select idsensor, fecha, valorcon from 
            sparksiot.consolidado where idsensor in (${detas})`;
            console.log(`select fecha, valorcon from 
            sparksiot.consolidado where idsensor in (${detas})`);
            const {rows} = await Pool.query(selectsensors);
            if (rows.length >0) {
                res.status(200).send( {data:rows, msg:'detalles de sensores'});
            }
        } catch (error) {
            console.log(error);
            console.log('error');
            res.status(500).send({data:[], msg:'Ocurrió error interno en el servidor, contacte con sistemas'});
        }


    }
    async insertarconsolidados(req, res){

        try {
            
            const distintos = `SELECT distinct(fecha) as fecha, idsensor FROM sparksiot.detasensor `;
            const distinc = await Pool.query(distintos);
            for await (const sensor of distinc.rows) {
                console.log(sensor);
                const dat2 = moment(sensor.fecha).format('YYYY-MM-DD')
                
                console.log('pasa primer for');
                console.log(dat2);
                
                const promedio = `SELECT ROUND(avg(valor)) as valorconsolidado, idsensor, fecha
                FROM sparksiot.detasensor where fecha = '${dat2}' and idsensor = ${sensor.idsensor}
                group by idsensor, fecha `;
                console.log(`SELECT ROUND(avg(valor)) as valorconsolidado, idsensor, fecha
                FROM sparksiot.detasensor where fecha = '${dat2}' and idsensor = ${sensor.idsensor}
                group by idsensor, fecha `);
                const prom = await Pool.query(promedio);
                console.log(prom);
                console.log(prom.rows);
                const dat3 = moment(prom.rows[0].fecha).format('YYYY-MM-DD')
                
                const insertarconsolidado = `insert into sparksiot.consolidado (idsensor, fecha, valorcon)
                values (${prom.rows[0].idsensor}, '${dat3}', ${prom.rows[0].valorconsolidado})`

                const insert = await Pool.query(insertarconsolidado)
                console.log(insert);
                console.log('insert');

           }

           const dat2 = moment(distinc.rows[0].fecha).format('YYYY-MM-DD')

           const insertarultimafecha = `insert into sparksiot.ultimafecha (fecha) values (${dat2})`
           
           const insert = await Pool.query(insertarultimafecha)
           console.log('ultima fecha ingresada');
           console.log(insert.rows);

//             SELECT distinct(fecha), idsensor FROM sparksiot.detasensor 


            
        } catch (error) {
            console.log(error);
            console.log('error');
            res.status(500).send({data:[], msg:'Ocurrió error interno en el servidor, contacte con sistemas'});
        }


    }

}

const MigracionEx = new Migracion();
module.exports = MigracionEx