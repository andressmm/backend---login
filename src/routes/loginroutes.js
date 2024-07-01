const express = require('express');
const router = express.Router();
const logRoutes = require('../controllers/loginController');




router.get('/', (req, res) => {
    res.redirect('/register.html');
});


router.post('/registro',logRoutes.registro) //registro usuario
router.post('/log',logRoutes.log) //form de login
//router.get('/logout',logRoutes.logout) //salir
router.get('/ingreso',logRoutes.ingreso) //boton de ingreso a login


router.get('/',(req,res)=>{
    res.json({mensaje:"hola desde login"})
})

module.exports=router;