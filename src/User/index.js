import React from 'react'
import "./index.css"

const UserData = (props) => {
    const {eachUser,userDelete} = props
    const {username,gender,_id} = eachUser
   const deleteUser = ()=>{
    userDelete(_id)
   }
  return (
    <li className='user-container'>
      <p>{username}</p>
      <p>{gender}</p>
    
      <button onClick={deleteUser}>🗑️</button>
    </li>
  )
}

export default UserData
