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
    <div className="tenderDetailContainer">
      <div className="inTenderDetailContainer">
        <div className="topContainer">
          <img
            src={tender.image ? `http://localhost:2005${tender.image}` : photo}
            className="detailImage"
          />
          <div className="topRight">
            <div className="topBid tag">
              <h1>
                Top Bid:{" "}
                <span className="topBidAmount">
                  ${highestBid ? highestBid.bidAmount : "No bids yet"}
                </span>
              </h1>
              {/* {highestBid && (
              <>
                <p>Vendor ID: {highestBid.vendorId}</p>
                <p>
                  Document:{" "}
                  <a
                    href={highestBid.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                </p>
              </>
            )} */}
            </div>
            <div className="date tag dateContainer">
              <h2>
                Due date: <span className="dueDate">{timeLeft}</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="details">
          <p className="basePrice">{`Base Price: ${tender.baseAmount}`}</p>
          <h2 className="title">{tender.title}</h2>
          <p className="description">{tender.description}</p>
        </div>
        <button
          className="bidButton"
          onClick={() => navigate("/bid", { state: { tenderId: tender._id } })}
        >
          Bid
        </button>
      </div>
    </div>
  )
}

export default TenderDetail
