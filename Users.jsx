import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Users() {
    const [users, setUsers] = useState({
        username:'',
        email:'',
        password:''
    });
 const [tableData, setTableData] = useState([]);
 const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:7000/insert', users)
    .then(response=>{
        setUsers(response.data);
        alert('User has been Inserted Successfully !');
    })
    .catch(err=>{
        console.log(`Failed to Insert ${err}`);
    })
 }

 //select
 useEffect(() =>{
    axios.get('http://localhost:7000/')
    .then(response=>{
        setTableData(response.data.result);
    })
    .catch(err=>{
        console.log(err);
    })
 }, []);

 //deleting user

 const handleDelete=(id)=>{
    axios.get(`http://localhost:7000/delete/${id}`)
    .then(response=>{
        alert('User has been Deleted !');
    })
    .catch(err=>{
        console.log(err);
    });

 }
  return (
    <div>
      <form method="POST">
        <input type="text" name='username' placeholder='UserName' value={users.username} onChange={e=>setUsers({...users,username:e.target.value})} /><br/>
        <input type="email" name='email' placeholder='Email Address' value={users.email} onChange={e=>setUsers({...users,email:e.target.value})} /><br/>
        <input type="password" name='password' placeholder='Password' value={users.password} onChange={e=>setUsers({...users,password:e.target.value})} /><br/>
        <button type='submit' onClick={handleSubmit}>Add User</button>
      </form>

      <table>
        <tr>
            <th>UserName</th>
            <th>Email Address</th>
            <th>Password</th>
            <th>Action</th>
        </tr>
        {
            tableData.map(dataa=>(
                <tr>
                    <td>{dataa.username}</td>
                    <td>{dataa.email}</td>
                    <td>{dataa.password}</td>
                    <td><button onClick={e=>handleDelete(dataa.id)}>Delete</button></td>
                </tr>
            ))
        }
      </table>
    </div>
  )
}
