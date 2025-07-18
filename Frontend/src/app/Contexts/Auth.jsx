import React, { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"))
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("role"))
  const [loading, setLoading] = useState(true)
  const [selectedComponent, setSelectedComponent] = useState("dashboard")

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("role") === "admin") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
      setIsAuth(true)
    } else {
      setIsAuth(false)
      setIsAdmin(false)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isAdmin,
        setIsAdmin,
        selectedComponent,
        setSelectedComponent,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
// import React, { createContext, useEffect, useState } from "react"

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"))
//   const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("role"))
//   const [loading, setLoading] = useState(true)
//   const [selectedComponent, setSelectedComponent] = useState("dashboard")

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       if (localStorage.getItem("role") === "admin") {
//         setIsAdmin(true)
//       } else {
//         setIsAdmin(false)
//       }
//       setIsAuth(true)
//     } else {
//       setIsAuth(false)
//       setIsAdmin(false)
//     }
//     setLoading(false)
//   }, [])

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuth,
//         setIsAuth,
//         isAdmin,
//         setIsAdmin,
//         selectedComponent,
//         setSelectedComponent,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }
