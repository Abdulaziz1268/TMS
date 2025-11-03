import { toast } from "sonner"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { adminApi, BASE_URL } from "../Config/Api"

function TenderList({ tender }) {
  const navigate = useNavigate()
  const { refresher, setRefresher } = useState(true)

  const handleClick = async () => {
    try {
      adminApi.delete(`/deleteTender/${tender._id}`)
      toast.success("deleted successfully")
      setRefresher((prevState) => !prevState)
    } catch (error) {
      toast.error("please try again")
    }
  }

  return (
    <div className="tenderListContainer">
      <div className="tenderImageContainer">
        <img src={`${BASE_URL}${tender.image}`} className="tenderPic" />
      </div>
      <div className="tenderDetailsContainer">
        <div className="leftContainer">
          <h2 className="tenderTitle">{tender.title}</h2>
          <h3 className="tenderDisc">{tender.description}</h3>
        </div>
        <div className="rightContainer">
          <button
            className="btn"
            onClick={() => navigate("/Detail", { state: { tender } })}
          >
            view Details
          </button>
          <button
            className="btn"
            onClick={() => {
              handleClick()
              setRefresher((prevState) => !prevState)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TenderList
