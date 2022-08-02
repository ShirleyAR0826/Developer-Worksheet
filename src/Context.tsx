import React, { useState, createContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { getUser } from "./utils/apiProvider";
import { users } from "./users_data";

export const ApiContext = createContext<any>(null)

export function ApiProvider({
  children,
}: {
  children: React.ReactElement
}): React.ReactElement {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    branchId: "",
    userName: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
  })

  const [usersList, setUserslist] = useState<any>(users)

  async function getUserDetails(): Promise<any> {
    const user = await getUser()
    if (!user) {
      navigate("/")
      return
    }
    setUser(user)
    return
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <ApiContext.Provider
      value={{
        user,
        usersList,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
