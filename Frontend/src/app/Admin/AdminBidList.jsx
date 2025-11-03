import { useEffect, useState } from "react"
import { toast } from "sonner"
import { adminApi } from "../Config/Api"

function Bids({ item }) {
  const [selectValue, setSelectValue] = useState("")
  const [bid, setBid] = useState({})

  useEffect(() => {
    adminApi
      .get(`/bid/${item}`)
      .then((result) => {
        console.log(result.data)
        setBid(result.data)
        setSelectValue(result.data.status) // Set initial select value
      })
      .catch((error) => console.log(error.message))
  }, [item])

  const handleChange = (event) => {
    setSelectValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    adminApi
      .patch(`/updateBidStatus/${item}`, {
        status: selectValue,
      }) // Correct data format
      .then((result) => {
        console.log(result.data)
        toast.success("updated Successfully")
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <div className="bidListContainer">
      <div
        style={{
          width: "25%",
          overflow: "hidden",
        }}
      >
        <p title={bid.vendorId} className="vendorId">
          {bid.vendorId}
        </p>
      </div>
      <p className="bidAmount">{bid.bidAmount}</p>
      <p className="viewDoc">
        <a href={bid.documentUrl} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      </p>
      <form onSubmit={handleSubmit} className="statusForm">
        <select
          className="bidStatus"
          value={selectValue}
          onChange={handleChange}
        >
          <option disabled value="">
            {bid.status}
          </option>
          <option value="pending">Pending</option>
          <option value="approved">Approve</option>
          <option value="rejected">Reject</option>
        </select>
        <button type="submit" className="bton">
          Save
        </button>
      </form>
    </div>
  )
}

export default Bids
