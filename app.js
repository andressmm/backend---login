/****** configuracion servidor ******/

const express = require('express'); // requerir express
const app = express(); // crear servidor
const methodOverride = require('method-override'); 
const rutas = require('./src/routes/mainroutes.js');
const rutasLogin = require('./src/routes/loginroutes.js');
const path = require('path');

const port = process.env.PORT || 3000; // selección del puerto


app.use(express.json());  //interpreta json enviados por header
app.use(express.urlencoded({ extended: true })); // middleware permite escuchar via post

// motor de renders
app.set('view engine','ejs');
app.set('views',(__dirname+'/views'))





app.use(express.static(path.join(__dirname, 'public'))); // middleware; especifico la carpeta donde estan los recursos

// Ruta principal que redirige a register.html
app.get('/', (req, res) => {
    res.redirect('/login');
});


app.use(methodOverride('_method')); // permite PUT y DELETE
app.use('/login',rutasLogin)
app.use('/main', rutas);

app.use((req, res, next) => {
    res.status(404).send(`<h1>PAGINA NO ENCONTRADA</h1>`);
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});


/*app.get('/listado', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'listado.html'));
});*/


app.listen(port, () => console.log(`El servidor está funcionando en el puerto ${port}`));
/****** fin configuracion servidor ******/