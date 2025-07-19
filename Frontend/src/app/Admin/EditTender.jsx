import { useLocation } from "react-router-dom"

const EditTender = () => {
  const location = useLocation()
  const { tender } = location.state || {}
  return (
    <div
      className="EditTenderContainer"
      style={{ width: "500px", height: "400px", background: "cornflowerblue" }}
    >
      <h1>Edit Tender Details</h1>
      <h1>{tender._id}</h1>
      <h1>{tender.title}</h1>
      <h1>{tender.description}</h1>
      <h1>{tender.status}</h1>
      <h1>{tender.createdAt}</h1>
    </div>
  )
}

export default EditTender
