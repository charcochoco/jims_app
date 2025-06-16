"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface User {
  role: string
  [key: string]: any
}

interface AuthContextProps {
  isLoggedIn: boolean
  isAdmin: boolean
  user: User | null
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("jwt_token")
    const userInfo = localStorage.getItem("user_info")

    if (token && userInfo) {
      const parsedUser = JSON.parse(userInfo)
      setUser(parsedUser)
    }
  }, [])
    
  const login = (user: User, token: string) => {
    localStorage.setItem("jwt_token", token)
    localStorage.setItem("user_info", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("jwt_token")
    localStorage.removeItem("user_info")
    setUser(null)
    window.location.href = "/" // Ou router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
