import React, { useEffect, useState } from 'react'
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import UserData from '../User';
import "./index.css"


const User = () => {

    const [username,setname] = useState("");
    const [gender,setgender] = useState("male");
    const [users,setUsers] = useState([])

    const [loading,setLoading] = useState(true);

    const onSubmitUser = async (e) => {
      setLoading(true)
      e.preventDefault();

      if(username===""){
        alert("Enter Your Name")
        return;
      }
      const newUser = {
          username,
          gender
      };
      
      try {
          await axios.post("https://user-test-6is2.onrender.com/api/users/", newUser);
          setname("")
          setgender("male");
          alert("User added successfully");
          setLoading(false)
          
      } catch (error) {
          if (error.response) {
              console.error('Error response:', error.response.data);
              console.error('Error status:', error.response.status);
              console.error('Error headers:', error.response.headers);
          } else if (error.request) {
              console.error('Error request:', error.request);
          } else {
              console.error('Error message:', error.message);
          }
          console.error('Error config:', error.config);
      }
  };
  
  const deleteUser = async (userId) => {
    try {
     
        const response = await axios.delete(`https://user-test-6is2.onrender.com/api/users/${userId}`);
        alert("User deleted successfully")
      
        console.log("User deleted successfully:", response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Error: User not found (404)");
        } else {
            console.error("Error deleting user:", error);
        }
    }
};




  useEffect(()=>{
      const getData = async()=>{
        setLoading(true)
        const response = await axios.get("https://user-test-6is2.onrender.com/api/users/");
        const data =response.data
       
        setUsers(data)
      }
      getData()
      setLoading(false)

  },[])

  return (
    <div className='container'>
      <h1> Add User</h1>
      <form onSubmit={onSubmitUser} className='form-container'>
        <input type='text' className='inputBox' placeholder='Enter Your Name' value={username} onChange={(e)=>setname(e.target.value)}/>
        
            <select onChange={(e)=>setgender(e.target.value) }  className='inputBox'>
                <option value={"male"}>male</option>
                <option value={"female"}>female</option>
            </select>
        
        <button type='submit' className='add-button'>Add</button>
      </form>

      <div>
        <h2>User Data</h2>
        {console.log(users)}
       {loading && <TailSpin height={30} width={40} color="blue" />}

        {users.length===0? <p>No User Found</p>: <ul>
          
          {users.map(each => (
    <UserData eachUser={each} key={each._id} userDelete={deleteUser}/>
  ))}
          </ul>}
      </div>
    </div>
  )
}

export default User
