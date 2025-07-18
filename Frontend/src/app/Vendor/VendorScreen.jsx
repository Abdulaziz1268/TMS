import Popup from "reactjs-popup"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import Home from "./Home"
import HomeTenderList from "./HomeTenderList"
import logoutPhoto from "../../assets/logout.svg"
import profilePhoto from "../../assets/profile picture placeholder.jpg"
import { UserContext } from "../Contexts/UserContext"

function VendorScreen({ src = profilePhoto }) {
  const [selectedItem, setSelectedItem] = useState("Home")
  // const { setUserData } = useContext(UserContext)
  const navigate = useNavigate()

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  const handleLogout = () => {
    // setUserData(null)
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }
  return (
    <div className="vendorContainer">
      <nav className="vendorNav">
        <div className="navLinkContainer">
          <h2>Tenders</h2>
        </div>
        <div className="vendorNavProfile">
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
      </nav>
      <div className="vendorMain"></div>
      {/* {selectedItem === "Home" ? <Home /> : <Tender />} */}
      <HomeTenderList />
    </div>
  )
}

export default VendorScreen
