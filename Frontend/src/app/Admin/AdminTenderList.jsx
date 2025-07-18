import { Formik } from "formik"
import Popup from "reactjs-popup"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css" // Ensure datepicker styles

import { adminApi } from "../Config/Api"
import DatePicker from "react-datepicker"
import TenderList from "../Components/TenderList"

function Tenders() {
  const [list, setList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    adminApi
      .get("/tenderList")
      .then((result) => {
        setList(result.data)
        console.log(result.data) // Logs updated data
      })
      .catch((error) => console.log(error.message))
  }, []) // No dependency needed

  return (
    <div className="outerContainer">
      <div className="addButtonContainer">
        <Popup
          trigger={<button className="button">New Tender</button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  baseAmount: 0,
                  deadLine: null,
                  image: null,
                }}
                onSubmit={(values) => {
                  const data = new FormData()
                  data.append("image", values.image)
                  data.append("title", values.title)
                  data.append("description", values.description)
                  data.append("baseAmount", values.baseAmount)
                  data.append("deadline", values.deadLine) // Corrected
                  console.log("Submitting deadlineee:", values.deadLine)
                  adminApi
                    .post("/postTender", data)
                    .then((result) => {
                      console.log(result.data)
                      toast.success("Posted successfully")

                      // Refresh tenders list
                      adminApi
                        .get("/tenderList")
                        .then((res) => setList(res.data))

                      setTimeout(() => {
                        close()
                      }, 1000)
                    })
                    .catch((error) => {
                      console.log(error.message)
                      toast.error("Please try again")
                    })
                }}
              >
                {({ handleChange, handleSubmit, setFieldValue, values }) => (
                  <form onSubmit={handleSubmit} className="submitForm">
                    <div className="topForm">
                      <input
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        onChange={handleChange}
                        className="inputForm"
                        value={values.title}
                      />
                      <input
                        type="number"
                        placeholder="Enter base amount"
                        name="baseAmount"
                        onChange={handleChange}
                        className="inputForm"
                        value={values.baseAmount}
                      />
                      <input
                        type="text"
                        placeholder="Enter description"
                        name="description"
                        className="inputForm"
                        onChange={handleChange}
                        value={values.description}
                      />
                      {/* <DatePicker
                        selected={values.deadLine} // Corrected
                        onChange={(date) => setFieldValue("deadLine", date)}
                        // dateFormat="yyyy/MM/dd"
                        minDate={new Date()}
                        placeholderText="Select a deadline"
                        className="datePicker"
                      /> */}
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        placeholder="Select Date"
                        name="deadLine"
                        onChange={handleChange}
                        className="inputForm"
                        value={values.deadLine}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="imageInput"
                        name="image"
                        onChange={(event) =>
                          setFieldValue("image", event.target.files[0])
                        }
                      />
                    </div>

                    <button type="submit" className="btton">
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          )}
        </Popup>
      </div>
      {list.map((tender) => (
        <TenderList key={tender._id} tender={tender} />
      ))}
    </div>
  )
}

export default Tenders
