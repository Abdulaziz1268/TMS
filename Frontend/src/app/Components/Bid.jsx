import { Formik } from "formik"
import { toast } from "sonner"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { BASE_URL, paymentApi, vendorApi } from "../Config/Api"

function Bid() {
  const [bAmount, setBAmount] = useState(0)
  const location = useLocation()
  const { tenderId } = location.state || {}
  const navigate = useNavigate()

  const fetchHighestBid = useCallback(async () => {
    try {
      const response = await vendorApi.get(`/highestBid/${tenderId}`)
      // Handle fetched highest bid here if needed
    } catch (error) {
      console.error("Error fetching highest bid:", error)
    }
  }, [tenderId])

  useEffect(() => {
    vendorApi
      .get(`/tender/${tenderId}`)
      .then((result) => setBAmount(result.data))
  }, [])

  return (
    <div className="bidContainer">
      <div className="innerContainer">
        <h1 className="header">Submit your bid</h1>
        <Formik
          initialValues={{
            tenderId: tenderId,
            vendorId: localStorage.getItem("userId"),
            bidAmount: 0,
            document: "",
          }}
          onSubmit={async (values) => {
            const data = {
              first_name: "abdu",
              last_name: "musa",
              amount: 300.0,
              currency: "ETB",
              email: "abdumh2018@gmail.com",
              phone: "0929247282",
              tx_ref: `TX-${Date.now()}`,
              callback_url: `${BASE_URL}/api/payment/paymentCheck`,
              return_url: `https://tenmansys.netlify.app/vendor?payment=success`,
            }
            try {
              const response = await paymentApi.post("/initiatePayment", data)
              window.location.href = response.data.data.checkout_url
            } catch (error) {
              console.log("payment error", error)
            }
            // const data = new FormData()
            // data.append("document", values.document)
            // data.append("tenderId", values.tenderId)
            // data.append("vendorId", values.vendorId)
            // data.append("bidAmount", values.bidAmount)
            // axios
            //   .post("http://localhost:2005/api/bid", data)
            //   .then((response) => {
            //     toast.success("Successfully submitted")
            //     setTimeout(() => {
            //       navigate("/vendor")
            //       fetchHighestBid() // Re-fetch the highest bid after submission
            //     }, 2000)
            //   })
            //   .catch((error) => {
            //     console.error("Error submitting bid:", error)
            //   })
          }}
        >
          {({ handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="amount" className="label">
                Enter bid amount:
              </label>
              <input
                id="amount"
                name="bidAmount"
                className="bidInput amountInput"
                type="number"
                // required
                placeholder="Enter bid amount"
                min={bAmount.baseAmount}
                onChange={handleChange("bidAmount")}
              />
              <label htmlFor="file" className="label">
                Attach file:
              </label>
              <input
                id="file"
                type="file"
                accept="application/pdf"
                // required
                className="fileInput bidInput"
                name="document"
                onChange={(event) =>
                  setFieldValue("document", event.target.files[0])
                }
              />
              {/* <button type="submit" className="bidButton">
                Submit
              </button> */}
              <button type="submit" className="bidButton">
                Pay with Chapa
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Bid
