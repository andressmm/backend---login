/****** configuracion servidor ******/

const express = require('express'); // requerir express
const app = express(); // crear servidor
const methodOverride = require('method-override'); 
const rutas = require('./src/routes/mainroutes.js');
const path = require('path');
const port = process.env.PORT || 3000; // selección del puerto
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // middleware permite escuchar via post

app.set('view engine','ejs');
app.set('views',(__dirname+'/views'))

app.use(express.static(path.join(__dirname, 'public'))); // middleware; especifico la carpeta donde estan los recursos



app.use(methodOverride('_method')); // permite PUT y DELETE
app.use('/', rutas);

app.use((req, res, next) => {
    res.status(404).send(`<h1>PAGINA NO ENCONTRADA</h1>`);
    //console.log(res);
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

app.listen(port, () => console.log(`El servidor está funcionando en el puerto ${port}`));
/****** fin configuracion servidor ******/