import { useContext } from "react"
import AdminSideBar from "./AdminSideBar"
import AdminNav from "./AdminNav"
import AdminDashboard from "./AdminDashboard"
import AdminTenderList from "./AdminTenderList"
import { AuthContext } from "../Contexts/Auth"
import UserList from "./UserList"

function AdminScreen() {
  const { selectedComponent } = useContext(AuthContext)

  return (
    <div className="adminContainer">
      <div className="sideBar">
        <AdminSideBar />
      </div>
      <div className="content">
        <div className="navBar">
          <AdminNav selectedComponent={selectedComponent} />
        </div>
        <div className="main">
          {(() => {
            switch (selectedComponent) {
              case "tenders":
                return <AdminTenderList />
              case "users":
                return <UserList />
              default:
                return <AdminDashboard />
            }
          })()}
        </div>
      </div>
    </div>
  )
}

export default AdminScreen
