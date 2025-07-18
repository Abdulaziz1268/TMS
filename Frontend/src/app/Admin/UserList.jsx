import { useEffect, useState } from "react"
import deleteIcon from "../../assets/delete-dark.png"
import editIcon from "../../assets/edit-dark.png"
import saveIcon from "../../assets/save-dark.png"
import cancelIcon from "../../assets/cancel-dark.png"
import "../../App"
import { Toaster, toast } from "sonner"
import { adminApi } from "../Config/Api"

const Users = () => {
  const [data, setData] = useState([])
  const [editUserId, setEditUserId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    role: "",
  })

  useEffect(() => {
    adminApi
      .get("/userList")
      .then((result) => {
        setData(result.data)
      })
      .catch((err) => console.log(err.message))
  }, [editUserId])

  const handleFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEditClick = (user) => {
    setEditUserId(user._id)
    setEditFormData(user)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await adminApi.patch(
        `/updateUser/${editUserId}`,
        editFormData
      )
      setData(
        data.map((user) => (user._id === editUserId ? response.data : user))
      )
      setEditUserId(null)
      toast.success("User successfully updated")
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("Error occurred")
    }
  }

  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/deleteUser/${id}`)
      setData((prevItems) => prevItems.filter((item) => item._id !== id))
      toast.success("User successfully deleted")
    } catch (error) {
      console.log(error.message)
      toast.error("There was an error, please try again")
    }
  }

  return (
    <div className="users-container">
      <Toaster richColors expand={false} position="bottom-center" />
      <table className="users-table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data r-border">ID</th>
            <th className="table-head-data r-border">First Name</th>
            <th className="table-head-data r-border">Last Name</th>
            <th className="table-head-data r-border">Email</th>
            <th className="table-head-data">Role</th>
            <th className="table-head-data">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user._id} className="table-row">
                {editUserId === user._id ? (
                  <>
                    <td className="table-row-data r-border">{user._id}</td>
                    <td className="table-row-data r-border">
                      <input
                        className="table-inputs inputs"
                        type="text"
                        name="fname"
                        value={editFormData.fname}
                        onChange={handleFormChange}
                      />
                    </td>
                    <td className="table-row-data r-border">
                      <input
                        type="text"
                        className="table-inputs inputs"
                        name="lname"
                        value={editFormData.lname}
                        onChange={handleFormChange}
                      />
                    </td>
                    <td className="table-row-data r-border">
                      <input
                        type="text"
                        name="email"
                        className="table-inputs inputs"
                        value={editFormData.email}
                        onChange={handleFormChange}
                      />
                    </td>
                    <td className="table-row-data">
                      <select
                        className="table-inputs inputs"
                        name="role"
                        onChange={handleFormChange}
                        value={editFormData.role}
                      >
                        <option value="admin">admin</option>
                        <option value="vendor">vendor</option>
                      </select>
                    </td>
                    <td className="table-row-data">
                      <div className="action-buttons">
                        <img
                          src={saveIcon}
                          className="row-btn"
                          alt="Save"
                          onClick={handleFormSubmit}
                        />
                        <img
                          src={cancelIcon}
                          className="row-btn"
                          alt="Cancel"
                          onClick={() => setEditUserId(null)}
                        />
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="table-row-data r-border">{user._id}</td>
                    <td className="table-row-data r-border">{user.fname}</td>
                    <td className="table-row-data r-border">{user.lname}</td>
                    <td className="table-row-data r-border">{user.email}</td>
                    <td className="table-row-data">{user.role}</td>
                    <td className="table-row-data">
                      <div className="action-buttons">
                        <img
                          src={editIcon}
                          className="row-btn"
                          alt="Edit"
                          onClick={() => handleEditClick(user)}
                        />
                        <img
                          src={deleteIcon}
                          className="row-btn"
                          alt="Delete"
                          onClick={() => handleDelete(user._id)}
                        />
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-users">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
