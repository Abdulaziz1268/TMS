import useAuth from "./UseAuth"

const AuthWrapper = ({ children }) => {
  useAuth()
  return <>{children}</>
}

export default AuthWrapper
