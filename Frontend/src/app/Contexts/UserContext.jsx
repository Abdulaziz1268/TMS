import React, { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [selectedComponent, setSelectedComponent] = useState("dashboard")
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    adminAuth: false,
    token: null,
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setAuthData({ isAuthenticated: true, token })
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        ...authData,
        userData,
        setUserData,
        selectedComponent,
        setSelectedComponent,
        setAuthData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
