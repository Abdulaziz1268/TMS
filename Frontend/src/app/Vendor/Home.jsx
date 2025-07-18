import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Contexts/Auth"

function Home() {
  const navigate = useNavigate()
  const { isAuth } = useContext(AuthContext)
  return (
    <div className="homeContainer">
      <nav className="homeNav">
        <h2 className="homeHeader">Home</h2>
        {isAuth ? (
          <h3 style={{ color: "cornflowerblue" }}>
            Welcome {localStorage.getItem("fname")}
          </h3>
        ) : (
          <div className="signContainer">
            <h3 className="sign in" onClick={() => navigate("/login")}>
              Signin
            </h3>
            <h3 className="sign" onClick={() => navigate("/register")}>
              Signup
            </h3>
          </div>
        )}
      </nav>
      <main className="homeMain">
        <h1 className="mainHeader">Welcome to the Tender Management System</h1>
        <button className="tenderButton" onClick={() => navigate("/vendor")}>
          <h2>Go to Tenders</h2>
        </button>
      </main>
    </div>
  )
}

export default Home
