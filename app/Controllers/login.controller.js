let {Pool} = require('../Database/index');
let bcrypt = require('bcrypt');
let token = require('jsonwebtoken');
let {SECRET_KEY} = require('../config');
let {registerquery, searchemail, registerrol, obtenerusuarios, obtenerusuarioslogin} = require('../Database/querys/login.query');
let {GenerateToken} = require('../handlers/login.handlers');


class Login{

    async Register(req, res){

        let {nombre, apellido, password, email, idrol, telefono} = req.body;
        let newpassword = await bcrypt.hash(password, 10);
        let user = {nombre, apellido, newpassword, email, telefono};
        let savedtoken = token.sign(user, SECRET_KEY, {expiresIn:'24h'});
        try {

            let queryregister = registerquery(user, savedtoken);
            let {rows} = await Pool.query(queryregister);
            if (rows.length <= 0) {
                res.status(300).json({
                    message:'No se logró registrar el usuario correctamente',
                    icon:'warning'
                });
                return      
            }
            let resgiterrolquery = registerrol(idrol, rows[0].id);
            let rolregisted = await Pool.query(resgiterrolquery);
            if (rolregisted.rows.length <=0) {
                res.status(300).json({
                    message:'Ocurrió un error al asignale permisos al usuario',
                    icon:'warning'
                });      
            }
            res.status(200).json({
                message:'usuario Registrado correctamente',
                user:rows,
                icon:'sucess'
            })
        } catch (error) {
            res.status(500).json({
                message:'ocurrio un error con el servidor, contacte con el administrador',
                icon:'error'
            })
        }
    }
    async login(req, res){

       let {password, email} = req.body;

       try {
       
        let queryuser = searchemail(email);
        let {rows} = await Pool.query(queryuser);
        if (rows.length <= 0) {
            return res.status(400).json({
                message:'Al parecer no existe usuario asociado ',
                status:400,
                icon:'warning'
            })
        }
        let validpwd = await bcrypt.compare(password, rows[0].password);
        
        if (!validpwd) {
            return res.json({
                message:'No se logró iniciar sesión, usuario o contraseña incorrecta',
                status:401,
                icon:'warning'
            })
        }
        let tokenready = GenerateToken({id:rows[0].id, email:rows[0].email});
        res.cookie('session', tokenready);
        let DatosUser = obtenerusuarioslogin(rows[0].id);
        let DataUser = await Pool.query(DatosUser);

        return res.status(200).json(
            {
                message:'Usuario Inició sesión correctamente',
                token:tokenready,
                icon:'success',
                status:200,
                user:DataUser.rows[0]
            }
        )
      
       } catch (error) {
          console.log('el error');
          console.log(error);
          return res
                .status(500).
                json({
                    message:'ocurrió un error al iniciar sesión, contacte con sistemas',
                    status:500,
                    icon:'error'
                }) 

       }
       
    }
    async logout(req, res){

        let {session} = req.cookies
        
        if (session) {
            res.clearCookie(session);
            res.cookie('session', '');
            return res.json({
                message:'su sesión fue cerrada exitosamente',
                icon:'success',
                status:200
            })           
        }
        return res.json({
            message:'su sesión ya fue cerrada',
            status:303 
        })
        
    }
    async GetRol(req, res){
        try {
            let {id} = req.params;
            let PermisosUser = await Pool.query(`select u.nombre, r.descripcion as descripcion  from users as u
            inner join roluser as ru
        on u.id = ru.idusuario
            inner join rol as r
        on ru.idrol = r.id where u.id = ${id}`);
        res.status(200).json({
            message:'este es el rol del usuario',
            rol: PermisosUser.rows[0].descripcion
        })   
        } catch (error) {
            console.log(error);
        }
    }
    async GetUser(req, res){
        
        try {
            let obtenerquery = obtenerusuarios();
            let {rows} = await Pool.query(obtenerquery); 
            if (rows.length <=0) {
                res.status(500).json({
                    message:'ocurrio un error con el servidor, contacte con el administrador',
                    icon:'error'
                })
                return
            }
            res.status(200).json({
                message:'lista de usuarios registrados',
                users:rows
            });

        } catch (error) {
            res.status(500).json({
                message:'ocurrio un error con el servidor, contacte con el administrador',
                icon:'error'
            })
        }
    }
    verifyToken(req, res, next) {
        console.log('headers');
        console.log(req.headers['authorization']);
        const token = req.headers['authorization'];
      
        if (!token) {
          return res.status(403).json({ message: 'Token no proporcionado' });
        }
      
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Token inválido' });
          }
          req.userId = decoded.id;
          next();
        });
      }
} 

let InstanciaLogin = new Login();
module.exports = InstanciaLogin;