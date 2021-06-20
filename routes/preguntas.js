const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//Get all pregs
router.get('/pregs', (req,res) =>{
    mysqlConnection.query('SELECT * FROM preguntas', (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


// GET an User
router.get('/pregs/:id', async(req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM preguntas WHERE id_pregunta = ?', [id], (err, rows, fields) => {
       
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
});

//Delete an user
router.delete('/pregs/delete/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM preguntas WHERE id_pregunta = ?', [id], (err, rows, fields) => {
      
      if(!err) {
        res.json({status: 'Pregunta Borrada'});
      } else {
        console.log(err);
      }
    });
});

// INSERT An user

router.post('/pregs/new', (req, res) => {
    mysqlConnection.query('INSERT INTO preguntas set ?', [req.body], (error, result) => {
        if (error) throw error;
 
        res.json({status: 'Pregunta guardada '});
    });
});



//update an user
router.put('/pregs/update/:id', (req, res) => {
    const { pregunta } = req.body;
    const { id_pregunta } = req.params;
    const query = `
    UPDATE preguntas SET pregunta=? where id_pregunta = ?`;
    mysqlConnection.query(query, [pregunta, id_pregunta], (err, rows, fields) => {
    if(rows.affectedRows === 0){
        res.json({mensaje: 'no se encontro el id'})
    }
      if(!err) {
        res.json({status: 'Se ha actualizado una pregunta'} );
      } else {
        console.log(err);
      }
    });
});

module.exports = router;