import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
export default function Adimin() {
    const [worker,setWorker] = useState({
        username:'',
        email:'',
        password:''
    })
    const [table,setTable] = useState([]);

    //insert
    const handleInsert=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:7000/insert', worker)
        .then(response=>{
            setWorker(response.data);
            alert('employee is recorded succssessfuly');
        })
        .catch(err=>{
            console.log(err);
        })
    }
    //select
    useEffect(()=>{
        axios.get('http://localhost:7000/')
        .then(response=>{
            setTable(response.data.result);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    //delete
    const handleRemove=(id)=>{
        axios.get(`http://localhost:7000/delete/${id}`)
        .then(respons=>{
            alert('one empoloyee is deleted');
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <h1>record the empoloyee</h1>
      <form action="" method="post">
        <input placeholder="USERNAME"type='text' name='username' value={worker.username} onChange={e=>setWorker({...worker,username:e.target.value})}/><br/>
        <input placeholder="EMAIL"type='email' name='email' value={worker.email} onChange={e=>setWorker({...worker,email:e.target.value})}/><br/>
        <input placeholder="PASSWORD"type='password' name='password' value={worker.password} onChange={e=>setWorker({...worker,password:e.target.value})}/><br/>
        <button onClick={handleInsert}>RECORD</button>
      </form>
        <tr>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>PASSWORD</th>
        </tr>
        {
          table.map(answer=>(
            <tr>
                <td>{answer.username}</td>
                <td>{answer.email}</td>
                <td>{answer.password}</td>
                <td><button onClick={e=>handleRemove(answer.id)}>REMOVE</button></td>
            </tr>
          ))  
        }
    </div>
  )
}
