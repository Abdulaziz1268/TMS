import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { adminApi } from "../Config/Api"

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

  // useEffect(() => {
  //   console.log(tender)
  // }, [refresher])

  return (
    <div className="tenderListContainer">
      <img src={`http://localhost:2005${tender.image}`} className="tenderPic" />
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
            view Bids
          </button>
          {/* <button className="btn">Edit</button> */}
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
      <Toaster />
    </div>
  )
}

export default TenderList
