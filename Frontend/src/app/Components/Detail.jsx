import moment from "moment"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import AdminBidList from "../Admin/AdminBidList"
import { adminApi, vendorApi } from "../Config/Api"
import photo from "../../assets/placeholderimage1.png"

const Detail = () => {
  const [highestBid, setHighestBid] = useState(null)
  const [timeLeft, setTimeLeft] = useState("")
  const location = useLocation()
  const { tender } = location.state || {} // Get tender from state
  const [selected, setSelected] = useState("close")

  if (!tender) return <p>Loading...</p> // Prevents crashes

  useEffect(() => {
    fetchHighestBid()
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [tender]) // Runs only when tender changes

  const fetchHighestBid = async () => {
    try {
      const response = await vendorApi.get(`/highestBid/${tender._id}`)
      setHighestBid(response.data)
    } catch (error) {
      console.error("Error fetching highest bid:", error)
    }
  }

  const calculateTimeLeft = () => {
    const deadline = moment(tender.deadline)
    const now = moment()
    const duration = moment.duration(deadline.diff(now))
    const hours = duration.asHours()

    if (hours <= 0) {
      setTimeLeft("00h 00m 00s") // Stops countdown at 00:00:00
    } else if (hours <= 48) {
      setTimeLeft(
        `${Math.floor(duration.asHours())}h ${Math.floor(
          duration.minutes()
        )}m ${Math.floor(duration.seconds())}s`
      )
    } else {
      setTimeLeft(moment(tender.deadline).format("MMMM Do, YYYY"))
    }
  }

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await adminApi.patch(
        `/updateTenderStatus/${tender._id}`,
        { status: selected }
      )
      console.log(response.data)
      toast.success("updated succefully")
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("error occured please try again")
    }
  }

  return (
    <div className="tenderDetailContainer">
      <div className="innerTenderDetailContainer">
        <div className="topContainer">
          <img
            src={tender.image ? `http://localhost:2005${tender.image}` : photo}
            className="detailImage"
            alt="Tender"
          />
          <div className="topRight">
            <div className="topBid tag">
              <h1>
                Top Bid:{" "}
                <span className="topBidAmount">
                  ${highestBid ? highestBid.bidAmount : "No bids yet"}
                </span>
              </h1>
            </div>
            <div className="date tag">
              <h2>
                Due date: <span className="dueDate">{timeLeft}</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="details">
          <form onSubmit={handleSubmit} className="updateStatus">
            <select
              name="Selected"
              value={selected}
              onChange={handleChange}
              className="statusSelect"
            >
              <option value="open">Open</option>
              <option value="close">Close</option>
              <option value="award">Awarded</option>
            </select>
            <button type="submit" className="statusBtn">
              Update
            </button>
          </form>
          <h2 className="title">{tender.title}</h2>
          <p className="description">{tender.description}</p>
        </div>
      </div>
      <div className="outerBidListContainer">
        <div className="bidListContainer bidHeader">
          <p className="vendorId">Vendor Id</p>
          <p className="bidAmount">Bid Amount</p>
          <p className="viewDoc">Document</p>
          <p className="statusForm">Status</p>
        </div>
        {tender.bids.map((item) => (
          <AdminBidList key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Detail
