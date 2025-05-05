const mysql=require('mysql');
const  express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const app=express();
const port=7000;
app.use(cors());
app.use(bodyparser.json());
//database connection
const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'app'
})
conn.connect((err)=>{
    if(err){
    console.log('database is not connected successfully');
}else{
    console.log('database is connected successfully');
}
})
//insert
app.post('/insert',(req,res)=>{
    const{username,email,password}=req.body;
    const sql=`INSERT INTO users VALUES(NULL,'${username}','${email}','${password}')`;
    conn.query(sql,(err)=>{
        if(err)throw err;
        res.json({message:'data is inserted well'});
    })
})
//select from table
app.get('/',(req,res)=>{
    const sql=`SELECT * FROM users`;
    conn.query(sql,(err,result)=>{
    if(err)throw err;
    res.json({result});
    })
})
//delete
app.get('/delete/:id',(req,res)=>{
    const{id}=req.params;
    const sql=`DELETE FROM users WHERE id='${id}'`;
    conn.query(sql,(err)=>{
        if(err)throw err;
        res.json('DATA IS DELETED');
    })
})
app.listen(port,()=>{
    console.log(`database is running on the server:${port}`);
});