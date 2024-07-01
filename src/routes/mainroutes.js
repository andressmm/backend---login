const express = require('express');
const router = express.Router();
const controladores = require('../controllers/mainController');
const auth = require('./../config/auth');

/*---- Definiciones de rutas ----*/

/* Ruta principal */
router.get('/', (req, res) => { // Autenticación aplicada
    res.render('index', { title: 'PANEL DE ADMINISTRACION' });
    console.log("Acceso a PORTADA");
});

/* Buscar */
//router.get('/search',  (req, res) => { // Autenticación aplicada
//    res.render('search', { title: 'BUSQUEDA DE PARTICIPANTES' });
//    console.log("Acceso a BUSQUEDA");
//});



/* links header */

router.get('/eventos', (req, res) => {res.redirect('/eventos.html');}); // listado de eventos
router.get('/close', (req, res) => {res.redirect('/close.html');}); // listado de eventos
router.get('/crearEv', (req, res) => {res.redirect('/crearEv.html');}); // listado de eventos
router.get('/evento/:id', (req, res) => {
    const id= req.params.id
    console.log(id);
    res.redirect(`/evento.html?id=${id}`);
   }); // evento individual




/* url fetch pedidos datos eventos */
router.get('/events', auth, controladores.getEvent); // Obtener eventos
router.get('/single/:id', auth, controladores.getEv); // Obtener un evento en particular

//router.post('/eventos', controladores.crearRegistro); // Crear evento
router.delete('/events',  controladores.eliminar); // Borrar evento
router.post('/modificar', controladores.getModificar); // Obtener datos del evento a actualizar
router.patch('/modificar', controladores.actualizar); // Actualizar evento

//router.post('/single', auth, controladores.getEv); // Obtener un evento en particular




/* Participantes */
router.get('/list', controladores.getList); // Obtener eventos y participantes
router.post('/list',  controladores.crearParticipante); // Crear participante
router.post('/edit',  controladores.getEdit); // Obtener datos del participante a actualizar
router.patch('/edit', controladores.actualizarpart); // Actualizar participante
router.delete('/list', controladores.delete); // Borrar participante

router.get('/addPart/:num',  (req, res) => { // Autenticación aplicada
    res.render('create_part', { title: 'AGREGAR PARTICIPANTE', num: req.params.num });
    console.log("Acceso a CREAR PARTICIPANTE");
});

module.exports = router;
