import moment from "moment"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import photo from "../../assets/placeholderimage1.png"
import { vendorApi } from "../Config/Api"

const TenderDetail = () => {
  const [highestBid, setHighestBid] = useState(null)
  const [timeLeft, setTimeLeft] = useState("")
  const location = useLocation()
  const { tender } = location.state || {}
  const navigate = useNavigate()

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
      setTimeLeft("00h 00m 00s")
      return
    }

    if (hours <= 48) {
      setTimeLeft(
        `${Math.floor(duration.asHours())}h ${Math.floor(
          duration.minutes()
        )}m ${Math.floor(duration.seconds())}s`
      )
    } else {
      setTimeLeft(moment(tender.deadline).format("MMMM Do, YYYY"))
    }
  }

  useEffect(() => {
    fetchHighestBid()
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [tender])

  return (
    <div className="tenderDetailContainer" style={{ height: "auto" }}>
      <div
        className="inTenderDetailContainer"
        style={{
          width: "50%",
          padding: "0 20px 20px 20px",
          boxShadow: "0px 0px 10px 0px cornflowerblue",
          borderRadius: "20px",
        }}
      >
        <div className="topContainer">
          <div className="detailImageContainer" style={{ margin: "20px" }}>
            <img
              src={
                tender.image ? `http://localhost:2005${tender.image}` : photo
              }
              className="detailImage"
            />
          </div>
          <div className="topRight">
            <div className="topBid tag">
              <h1>
                Top Bid <br />
                <span className="topBidAmount">
                  $ {highestBid ? highestBid.bidAmount : "No bids yet"}
                </span>
              </h1>
            </div>
            <div className="date tag">
              <h1>
                Due date <br />
                <span className="dueDate">
                  {timeLeft !== "00h 00m 00s" || tender.status === "closed"
                    ? timeLeft
                    : new Date(tender.deadline).toDateString()}
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div className="details">
          <p className="basePrice">{`Base Price: ${tender.baseAmount}`}</p>
          <h1
            className="title"
            style={{
              color: "cornflowerblue",
              display: "flex",
              alignSelf: "start",
            }}
          >
            {tender.title}
          </h1>
          <p className="description">{tender.description}</p>
        </div>
        {localStorage.getItem("role") !== "admin" && (
          <button
            className="bidButton"
            onClick={() =>
              navigate("/bid", { state: { tenderId: tender._id } })
            }
          >
            Bid
          </button>
        )}
      </div>
    </div>
  )
}

export default TenderDetail
