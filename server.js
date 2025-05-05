const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'shopping'
});

db.connect((err) =>{
    if(err)throw err;
    console.log('Database Connected');
});

app.post('/submit_form', (req,res) =>{
    const {p_name, p_price, quantity} = req.body;
    const sql = `INSERT INTO products VALUES (NULL, '${p_name}', '${p_price}', '${quantity}')`;
    db.query(sql, (err) =>{
        if(err){
            res.json({message: 'Failed to insert'});
        }else{
            res.json({message:'inserted successfully !'});
        }
    })
});

app.get('/', (req,res) =>{
    const sql = `SELECT * FROM products `;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.json({result});
    })
});

app.get('/delete/:id', (req,res) =>{
    const id = req.params.id;
    const sql = `DELETE FROM products WHERE id='${id}'`;
    db.query(sql, (err) =>{
        if(err) throw err;
        res.json({message:'Deleted Successfully'});
    });

})

app.listen(PORT, () =>{
    console.log(`Server is Running on port ${PORT}`);
});