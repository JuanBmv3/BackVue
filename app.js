import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
/*
const connection = mysql.createConnection({
  host     : 'user',
  user     : 'b9a5f13a69564c',
  password : 'ff71defe',
  database : 'heroku_f5762256dbe1f5b'
});*/



//Rutas
app.use(require('./routes/departamentos'));
app.use(require('./routes/preguntas'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
//nuestro front
app.use(express.static(path.join(__dirname, '../front')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port '+ app.get('puerto'));
});