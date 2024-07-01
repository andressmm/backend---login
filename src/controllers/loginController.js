const { conn }=require('../db/conexion') //conexion bd
const jwt=require('jsonwebtoken') // generador token
const bcrypt=require('bcryptjs') //encriptador
const jwtconfig=require('./../config/jwtconfig.js') //config del token

module.exports={
    registro: async(req,res)=>{
        const {user,password}=req.body //obtengo los campos del body
        const encriptado= await bcrypt.hash(password, 8)
        const [creado]= await conn.query(`INSERT INTO users (user,pass) VALUES (?,?)`,[user,encriptado])
        res.redirect('/login.html') // creado el usuario redirijo al login
    
    },

    log: async(req,res)=>{

                const {user,password}=req.body //obtengo los campos del body

             const [[valido]]=await conn.query(`select * from users where user=?`,user)
            console.log("Usuario: ",valido.user)
             console.log("Contrasena: ",valido.pass)
             if (valido===undefined){ //primera validacion (si no existe el usuario)
                    res.status(404).send('No existe el usuario')
                                      }
                                    else 
                                    {

                                          
                                        if (!(await bcrypt.compare(password,valido.pass) ))
                                            { //segunda validacion, no coinciden las contrasenas
                                                         res.status(401).send({auth:false,token:null})
                                    
                                    } else { 
                                    const token=jwt.sign({id:valido.id},jwtconfig.secretKey,{expiresIn: jwtconfig.expira})
                                         res.status(201).send({auth:true,token})
                                    }}           
       
            },
    
    logout: async(req,res)=>{


    },
    ingreso: async(req,res)=>{
        res.redirect('/login.html') // creado el usuario redirijo al login
    },
}
