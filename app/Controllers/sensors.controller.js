const {Pool} = require("../Database");
const { registersensor, shearbyname, lissensors, eliminacionlogica, updatesensor, lissensorsbad } = require("../Database/querys/sensors");

class Sensors{

    async RegisterSensors(req, res){
        let {sensor} = req.body;

        let querybyname = shearbyname(sensor.elementoquimico);
        let foundEQ = await Pool.query(querybyname);
        try {
            if (foundEQ.rows.length >0) {
                return res.status(303)
                    .json(
                        {
                            message:'Ya se encuentra un sensor asociado a este elemento quimico',
                            icon:'warning'
                        }
                    )
            }
            let queryregister = registersensor(sensor);
            let {rows} = await Pool.query(queryregister);
            if (rows.length <=0) {
                return res.status(400)
                .json(
                    {
                        message:'No se logró crear el sensor correctamente',
                        icon:'warning',
                        text:'Bad request'
                    }
                )         
            }        
            return res.status(200)
            .json(
                {
                    message:'Sensor creado correctamente',
                    icon:'success'
                }
            ) 
        } catch (error) {
            console.log('el error');
            console.log(error);
            return res.status(500)
            .json(
                {
                    message:'Ocurrió un error, contacte con sistemas',
                    icon:'error'
                }
            ) 
        }
       
    }

    async ListaSensors(req, res){
        try {
            let sensorsquery = lissensors();
            let listSensors = await Pool.query(sensorsquery);
            return res.status(200)
                   .json({
                        listasensor: listSensors.rows,
                        cantidadsensors:listSensors.rowCount
                   })
        } catch (error) {
            console.log('el error ');
            console.log(error);
            return res.status(500)
                   .json({
                        listasensor:[],
                        message:'Ocurrió un error, contacte con sistemas'
                   })
        }
    }
    async ListaSensorsbad(req, res){
        try {
            let sensorsquery = lissensorsbad();
            let listSensors = await Pool.query(sensorsquery);
            return res.status(200)
                   .json({
                        listasensor: listSensors.rows,
                        cantidadsensors:listSensors.rowCount
                   })
        } catch (error) {
            console.log('el error ');
            console.log(error);
            return res.status(500)
                   .json({
                        listasensor:[],
                        message:'Ocurrió un error, contacte con sistemas'
                   })
        }
    }

    async DeleteSensors(req, res){
        let {id} = req.params;
        let deletesensor = eliminacionlogica(id);
        let {rows} = await Pool.query(deletesensor);
        if (rows.length < 0) {
            return res.status(400)
                   .json({
                        message:'No se logró eliminar el sensor',
                        icon:'warning',
                        status:400
                   });
        }
        return res.status(200)
        .json({
             message:'Se eliminó correctamente el sensor',
             icon:'success',
             status:200
        });
    }
    async UpdateSensor(req, res){
        let {sensor} = req.body;
        let {id} = req.params;
        let updatequery = updatesensor(sensor, id);
        
        try {
            let {rows} = await Pool.query(updatequery);
            if (rows.length < 0) {
                return res.status(400)
                .json({
                     message:'No se logró actualizar el sensor',
                     icon:'warning',
                     status:400
                });
            }
            return res.status(200)
            .json({
                 message:'El sensor fue actualizado correctamente',
                 icon:'success',
                 status:200
            });

        } catch (error) {
            console.log('el erorr');
            console.log(error);
            return res.status(500)
                .json({
                     message:'Existió un error en el servidor, contacte con el Administrador',
                     icon:'error',
                     status:500
                });
        }

    }

}

let InstanciaSensors = new Sensors();
module.exports = InstanciaSensors;