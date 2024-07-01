const jwt=require('jsonwebtoken')
const jwtconfig=require('./jwtconfig')

module.exports=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    // si llega o no token en el header
    if (!authHeader) { res.status(403).send({auth:false,message:'No enviaste token'})}
    
 // si llego un token
    const token=authHeader.split(' ')[1];

    // validez del token
    if (!token) res.status(401).send({auth:false,message:'Token invalido'})
    
    
    // verifico si el token con la llave secreta es correcto
        jwt.verify(token,jwtconfig.secretKey,(err,decoded)=>{
        if (err) return  res.status(500).send({auth:false,message:'Token no autorizado'})
            next()
    })

}