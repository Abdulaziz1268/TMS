import { useState, useContext } from "react"
import { AuthContext } from "../Contexts/Auth"
import "../../App.css"

function SideBar() {
  const { setSelectedComponent } = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState("dashboard")

  const handleItemClick = (item) => {
    setActiveItem(item)
    setSelectedComponent(item)
  }

  return (
    <div className="sideBarContainer">
      <div className="topMargin"></div>
      <div className="sideBarListContainer">
        <div
          className={`list ${
            activeItem === "dashboard" ? "active" : ""
          } listUpdated`}
          onClick={() => handleItemClick("dashboard")}
        >
          <h2>Dashboard</h2>
        </div>
        <div
          className={`list ${
            activeItem === "tenders" ? "active" : ""
          } listUpdated`}
          onClick={() => handleItemClick("tenders")}
        >
          <h2>Tenders</h2>
        </div>
        <div
          className={`list ${
            activeItem === "users" ? "active" : ""
          } listUpdated`}
          onClick={() => handleItemClick("users")}
        >
          <h2>Users</h2>
        </div>
      </div>
    </div>
  )
}

export default SideBar
