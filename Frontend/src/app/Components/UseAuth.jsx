import { useContext, useEffect } from "react"
import { UserContext } from "../Contexts/UserContext"

const useAuth = () => {
  const { setAuthData } = useContext(UserContext)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setAuthData({ isAuthenticated: true, token })
    }
  }, [setAuthData])

  return null
}

export default useAuth
