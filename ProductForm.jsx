import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function ProductForm(){

    const [formData, setFormData] = useState({
        p_name:'',
        p_price:'',
        quantity:''
    });

    const [tableData, setTableData] = useState([]);
//insert into products
    const handleSubmit = (e) =>{
        e.preventDefault();
         axios.post('http://localhost:5000/submit_form', formData)
         .then(response =>{
            setFormData(response.data)
            alert('Product Inserted Succeessfully !');
         })
         .catch(err=>{
            console.log(err)
         }
         )}
//selecting data
useEffect(()=>{
    axios.get('http://localhost:5000/')
    .then(response=>{
        setTableData(response.data.result)
    })
    .catch(err=>{
        console.log(err)
    })
},[]);

const handleDelete=(id)=>{
    axios.get(`http://localhost:5000/delete/${id}`)
    .then(response=>{
        alert('Product Deleted !');
    })
    .catch(err=>{
        console.log(err)
    })
}


return(
    <div>
        <form method="POST">

            <input type="text" name="p_name" placeholder="Product Name" value={formData.p_name} onChange={e=>setFormData({...formData,p_name:e.target.value})} /><br/>

            <input type="number" name="p_price" placeholder="Product Price" value={formData.p_price} onChange={e=>setFormData({...formData,p_price:e.target.value})} /><br/>

            <input type="number" name="quantity" value={formData.quantity} onChange={e=>setFormData({...formData,quantity:e.target.value})} /><br/>

            <button type="submit" onClick={handleSubmit}>Add Product</button>


        </form>

        <table>
            <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>
          {
            tableData.map(data=>(
                <tr>
                    <td>{data.p_name}</td>
                    <td>{data.p_price} Rwf</td>
                    <td>{data.quantity} kg</td>
                    <td><button onClick={e=>handleDelete(data.id)}>Delete</button></td>
                    </tr>
            ))
          }

        </table>
    </div>
)
}
export default ProductForm