const express = require('express');
const router = express.Router();
const controladores = require('../controllers/mainController');

/*---- definiciones de rutas ----*/
/*---- definiciones de rutas ----*/
/*---- definiciones de rutas ----*/

/* ruta principal */
router.get('/', (req, res) => {
    res.render('index', { title: 'PANEL DE ADMINISTRACION' });
    console.log("PORTADA")
});


/* buscar */ 
router.get('/search', (req, res) => {
    res.render('search', { title: 'BUSQUEDA DE PARTICIPANTES' });
    console.log("BUSQUEDA")

});

/* agregar evento - manda al form de ingreso de datos  */
router.get('/addEvents', (req, res) => {
    res.render('create_event', { title: 'AGREGAR EVENTO' });
    console.log("CREAR EVENTO")

});

/* login */
router.post('/login',  controladores.loginUsr);

/* eventos */
router.get('/events', controladores.getEvent); //obtener eventos
router.delete('/events', controladores.eliminar);// Borrar evento
router.post('/modificar', controladores.getModificar); // obtengo datos del evento a actualizar
router.patch('/modificar', controladores.actualizar); // actualizar evento
router.post('/events', controladores.crearRegistro);// crear evento
router.post('/single', controladores.getEv); //obtener un evento en particular


/* participantes */
router.get('/list', controladores.getList); //obtener eventos y participantes
router.post('/edit', controladores.getEdit); // obtengo datos del participante a actualizar
router.patch('/edit', controladores.actualizarpart); // actualizar participante con los nuevos datos
router.delete('/list', controladores.delete);// Borrar participante
router.get('/addPart/:num',(req, res) => {
    res.render('create_part', { title: 'AGREGAR PARTICIPANTE' ,num: req.params.num});
    console.log("CREAR PARTICIPANTE")

});

router.post('/list', controladores.crearParticipante);// crear evento




/*
router.get('/edit/:num', controladores.getModificar); // Actualización
router.patch('/edit', controladores.actualizar);
*/
module.exports = router;
