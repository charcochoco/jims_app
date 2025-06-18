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
    const fetchUser = async () => {
        try {
            const res = await fetch("/api/auth/me", { method: "GET", credentials: "include" })
            if (!res.ok) throw new Error("Non connecté")
            const data = await res.json()
            setUser(data.user)
        } catch {
            setUser(null)
        }
    }

    fetchUser()
    }, [])
    
  const login = (user: User, token: string) => {
    setUser(user)
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    setUser(null)
    window.location.href = "/login"
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
