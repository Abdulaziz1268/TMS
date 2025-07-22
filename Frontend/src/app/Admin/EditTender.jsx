import { Formik } from "formik"
import { useLocation, useNavigate } from "react-router-dom"
import { adminApi, vendorApi } from "../Config/Api"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const EditTender = () => {
  const [tender, setTender] = useState({})
  const [refresher, setRefresher] = useState(false)
  const location = useLocation()
  const { tenderId } = location.state || {}
  const navigate = useNavigate()

  useEffect(() => {
    if (!tenderId) return

    const fetchTender = async () => {
      try {
        const response = await vendorApi.get(`/tender/${tenderId}`)
        setTender(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTender()
  }, [tenderId, refresher])

  if (!tender || !tender._id) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <p>Loading tender details...</p>
      </div>
    )
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ margin: "20px 100px", width: "50%" }}>
        <h1 style={{ color: "cornflowerblue" }}>Edit Tender Detail</h1>
        <Formik
          enableReinitialize
          initialValues={{
            title: tender.title,
            baseAmount: tender.baseAmount,
            description: tender.description,
            status: tender.status,
            deadline: tender.deadline
              ? new Date(tender.deadline).toISOString().split("T")[0]
              : "",
            image: tender.image,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            const formData = new FormData()
            formData.append("title", values.title)
            formData.append("baseAmount", values.baseAmount)
            formData.append("description", values.description)
            formData.append("status", values.status)
            formData.append("deadline", values.deadline)

            if (values.image instanceof File) {
              formData.append("image", values.image)
            }

            try {
              const result = await adminApi.patch(
                `/updateTender/${tenderId}`,
                formData
              )
              console.log(result)
              toast.success("Updated Successfully.")
              setRefresher((prev) => !prev)
              setTimeout(() => {
                navigate("/Detail", { state: { tender: result.data } })
              }, 1500)
            } catch (error) {
              console.log(error)
              toast.error("Error occured. Please try again!")
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="submitForm">
              <div className="topForm">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    width: "100%",
                    margin: "20px 0",
                  }}
                >
                  {values.image instanceof File ? (
                    <>
                      <img
                        src={URL.createObjectURL(values.image)}
                        alt="Preview"
                        style={{ height: "40vh", borderRadius: "20px" }}
                      />
                      <p style={{ fontSize: "18px", color: "gray" }}>
                        {values.image.name}
                      </p>
                    </>
                  ) : (
                    <img
                      src={`http://localhost:2005${values.image}`}
                      alt="Existing"
                      style={{ height: "40vh", borderRadius: "20px" }}
                    />
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    margin: "20px 0",
                    flexDirection: "column",
                    alignItems: "start",
                    borderColor: "cornflowerblue",
                    boxShadow: "0 2px 12px rgba(100, 149, 237, 0.4)",
                    padding: "30px",
                    borderRadius: "30px",
                  }}
                >
                  <h3 style={{ marginTop: "10px" }}>Title</h3>
                  <input
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    onChange={handleChange}
                    className="inputForm"
                    value={values.title}
                  />
                  <h3 style={{ marginTop: "10px" }}>Base Amount</h3>
                  <input
                    type="number"
                    placeholder="Enter base amount"
                    name="baseAmount"
                    onChange={handleChange}
                    className="inputForm"
                    value={values.baseAmount}
                  />
                  <h3 style={{ marginTop: "10px" }}>Description</h3>
                  <input
                    type="text"
                    placeholder="Enter description"
                    name="description"
                    className="inputForm"
                    onChange={handleChange}
                    value={values.description}
                  />
                  <h3 style={{ marginTop: "10px" }}>Deadline</h3>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    placeholder="Select Date"
                    name="deadline"
                    onChange={handleChange}
                    className="inputForm"
                    value={values.deadline}
                  />
                  <h3 style={{ marginTop: "10px" }}>Tender Image</h3>
                  <input
                    type="file"
                    accept="image/*"
                    className="imageInput"
                    name="image"
                    onChange={(event) =>
                      setFieldValue("image", event.target.files[0])
                    }
                  />
                  <h3 style={{ marginTop: "10px" }}>Status</h3>
                  <select
                    name="status"
                    className="inputForm"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>
                    <option value="Awarded">Awarded</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btton" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default EditTender
