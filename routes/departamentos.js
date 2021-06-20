const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//Get all users
router.get('/deps', (req,res) =>{
    mysqlConnection.query('SELECT * FROM departamentos', (err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


// GET an User
router.get('/deps/:id', async(req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM departamentos WHERE id_departamento = ?', [id], (err, rows, fields) => {
       
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
});

//Delete an user
router.delete('/deps/delete/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM departamentos WHERE id_departamento = ?', [id], (err, rows, fields) => {
      
      if(!err) {
        res.json({status: 'Departamento Borrado'});
      } else {
        console.log(err);
      }
    });
});

// INSERT An user

router.post('/deps/new', (req, res) => {
    mysqlConnection.query('INSERT INTO departamentos set ?', [req.body], (error, result) => {
        if (error) throw error;
 
        res.json({status: 'Departamento guardado '});
    });
});



//update an user
router.put('/deps/update/:id', (req, res) => {
    const { departamento } = req.body;
    const { id_departamento } = req.params;
    const query = `
    UPDATE departamentos SET departamento=? where id_departamento = ?`;
    mysqlConnection.query(query, [departamento, id_departamento], (err, rows, fields) => {
    if(rows.affectedRows === 0){
        res.json({mensaje: 'no se encontro el id'})
    }
      if(!err) {
        res.json({status: 'Se ha actualizado un departamento'} );
      } else {
        console.log(err);
      }
    });
});

module.exports = router;