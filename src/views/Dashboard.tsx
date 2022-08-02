import userEvent from "@testing-library/user-event";
import React, { FC, useContext, useState} from "react"
import { ApiContext } from "../Context"
import { logout } from "../utils/apiProvider";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Dashboard: FC = () => {
  const context = useContext(ApiContext)
  const navigate = useNavigate();
  const [userName, setUserName] = useState("")
  const [newUser, setNewUser] = useState({
    branchId: "",
    userName: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
  })

  console.log('context', context)

  useEffect(() => {
    setUserName(context.user.userName)
  }, [context])
  

  const handleSubmit = () => {

  }

  const handleRemove = (index: number) => {

  }

  const handleLogout = async() => {
    await logout()
    navigate('/')
  }

  const handleReset = () => {
    setNewUser({
      branchId: "",
      userName: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      position: "",
    })
  }

  return(
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{userName}</h1>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <div className="dashboard-main">
        <form onSubmit={handleSubmit} className="dashboard-main-form">
          <input 
            className="login-form-input"
            type="string" 
            value={newUser.branchId}
            onChange={(e) => setNewUser({
              ...newUser,
              branchId: e.target.value
            })}
            placeholder="Branch ID"
          />
          <input 
            className="login-form-input"
            type="string" 
            value={newUser.userName}
            onChange={(e) => setNewUser({
              ...newUser,
              userName: e.target.value
            })}
            placeholder="UserName"
          />
          <input 
            className="login-form-input"
            type="string" 
            value={newUser.firstName}
            onChange={(e) => setNewUser({
              ...newUser,
              firstName: e.target.value
            })}
            placeholder="First Name"
          />
          <input 
            className="login-form-input"
            type="string" 
            value={newUser.middleName}
            onChange={(e) => setNewUser({
              ...newUser,
              middleName: e.target.value
            })}
            placeholder="Middle Name"
          />
          <input 
            className="login-form-input"
            type="string" 
            value={newUser.lastName}
            onChange={(e) => setNewUser({
              ...newUser,
              lastName: e.target.value
            })}
            placeholder="Last Name"
          />
          <input 
            className="login-form-input"
            type="string" 
            value={newUser.position}
            onChange={(e) => setNewUser({
              ...newUser,
              position: e.target.value
            })}
            placeholder="Position"
          />
          <input 
            className="login-form-input"
            type="string" 
            value={newUser.password}
            onChange={(e) => setNewUser({
              ...newUser,
              password: e.target.value
            })}
            placeholder="Password"
          />
          <div className="dashboard-main-form-actions">
            <button type="button" onClick={handleReset}>RESET</button>
            <button type="submit" >ADD</button>
          </div>
        </form>
        <table className="dashboard-main-table">
          <tr>
            <th>#</th>
            <th>Branch ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          {context.usersList.map((el: any, i: number) => {
            return <tr>
              <td>{i+1}</td>
              <td>{el.branchId}</td>
              <td>{el.userName}</td>
              <td>{`${el.firstName} ${el.middleName.charAt(0).toUpperCase()}. ${el.lastName}`}</td>
              <td>{el.position}</td>
              <td>
                <button onClick={()=>handleRemove(i)}>Remove</button>
              </td>
            </tr>
          })}
        </table>
      </div>
    </div>
);}

export default Dashboard;