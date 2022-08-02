import React, { FC, useState } from "react"
import { login } from "../utils/apiProvider";
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const navigate = useNavigate();
  const [branchId, setBranchId] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState({
    isError: false,
    message: "",
  })

  const validateInput = (b: string, u: string, p: string) => {
    let validationError = { isError: false, message: "" }

    if (b.trim() === "" || u.trim() === "" || p.trim() === "") {
      validationError.isError = true
      validationError.message = "Branch ID, Username and Passworrd must be filled"
    }

    return validationError
  }

  const handleSubmit = async() => {
    const validate = validateInput(branchId, userName, password)
    if (validate?.isError) {
      setError({
        ...error,
        isError: validate.isError,
        message: validate.message,
      })
    } else {
      try {
        const res: any = await login(branchId, userName.trim(), password)
        if(res && res.userName) navigate("/dashboard")
      } catch (e: any) {
        setError({ ...error, isError: true, message: e.message })
        console.log(e)
      }
    }
  }

  return (
  <div className="login">
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input 
        className="login-form-input"
        type="text" 
        value={branchId}
        onChange={(e) => setBranchId(e.target.value)}
        placeholder="Branch ID"
      />
      <input 
        className="login-form-input"
        type="text" 
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />
      <input 
        className="login-form-input"
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" className="login-form-button">LOGIN</button>
      {error.isError && <div>{error.message}</div>}
    </form>
  </div>
  )
};

export default Login;