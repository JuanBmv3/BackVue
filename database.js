const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'covid'
});

/*
const connection = mysql.createConnection({
  host     : 'user',
  user     : 'b9a5f13a69564c',
  password : 'ff71defe',
  database : 'heroku_f5762256dbe1f5b'
});*/

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Db is connected');
    }

});

module.exports = mysqlConnection;