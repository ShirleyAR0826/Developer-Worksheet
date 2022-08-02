import { users } from "../users_data"

export interface User {
  branchId: number,
  userName: string,
  password: string,
  firstName: string,
  middleName: string,
  lastName: string,
  position: string,
}

export function login(
  branchId: string,
  username: string,
  password: string
) {
  try {
    const user = users.filter(el => el.branchId === parseInt(branchId) && el.userName === username && el.password === password)
    if(user && user[0]) {
      localStorage.setItem("currentUser", JSON.stringify(user[0]))
      return user[0]
    }
  } catch (error) {
    window.console.log("error signing in", error)
    return
  }
}

export function getUser() {
  try {
    let user = localStorage.getItem("currentUser")
    if(user) {
      return JSON.parse(user)
    }
  } catch (error) {
    window.console.log("error getting current user", error)
    return
  }
}

export function logout() {
  try {
    return localStorage.removeItem("currentUser")
  } catch (error) {
    window.console.log("error logging out", error)
    return
  }
}

export default {
  login,
  getUser,
  logout
}