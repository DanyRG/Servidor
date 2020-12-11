require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

// Habilitar CORS
// app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

app.get('/', function (req, res) {
  res.send('<h1>Bienvenido a mi servidor REST (localhost)</h1>')
});

app.use(require('./routes/usuario'));
app.use(require('./routes/categoria'));
app.use(require('./routes/login'));
app.use(require('./routes/productos'));
 

mongoose.connect('mongodb+srv://admin:bLyy5FK9SAtXoteF@cluster0.qj7xo.mongodb.net/Cafeteria', { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
}, (err, res) => {
  if(err) throw err;
  console.log('Base de Datos ONLINE');
});
 
app.listen(process.env.PORT, () => {
    console.log('El servidor está en linea en el puerto', process.env.PORT)
});