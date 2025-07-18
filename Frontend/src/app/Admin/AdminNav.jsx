import { useContext } from "react"
import Popup from "reactjs-popup"
import photo from "../../assets/profile picture placeholder.jpg"
import homePhoto from "../../assets/Home.svg"
import { useNavigate } from "react-router-dom"
import logoutPhoto from "../../assets/logout.svg"

function AdminNav({ selectedComponent, src = photo }) {
  // const { setUserData } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    // setUserData(null)
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    navigate("/login")
  }
  return (
    <div className="navContainer">
      <h2 className="navHeader">{selectedComponent.toUpperCase()}</h2>
      <div className="navProfile">
        <img
          src={homePhoto}
          alt="home image"
          className="homeImage"
          onClick={() => navigate("/")}
        />
        <Popup
          trigger={
            <img src={src} alt="profile image" className="profileImage" />
          }
          position="bottom"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          arrow={false}
        >
          <div className="profileMenu">
            <div className="menu-item" onClick={() => handleLogout()}>
              <img
                src={logoutPhoto}
                alt="logout image"
                className="logoutImage"
              />
              <p className="logoutText">Logout</p>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  )
}

export default AdminNav
