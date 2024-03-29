/* Librerias */
const express = require('express');
const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');

/* Incluimos la Api*/
const api = require('./server/api');

/*Crear App de Express*/
const app = express();

/* Parser para POST */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Static Path */
app.use(express.static(path.join(__dirname, 'dist')));



/* Importacion barata de imagenes*/
app.get('/theicon.png',function(req,res) {
    res.sendFile(__dirname + '/src/theicon.png');
});






/* Ruta para nuestra API */
app.use('/api/v1', api);

/* Todas las rutas no dirigidas a la API se las enviamos a angular */
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/* Setear el puerto donde se escucharán las peticiones */
const port = process.env.PORT || '3000';
app.set('port', port);

/* Levantamos el servidor */
const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
},app);
server.listen(port,()=> console.log(`API corriendo en el puerto:${port}`));
