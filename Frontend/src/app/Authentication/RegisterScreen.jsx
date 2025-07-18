import { Formik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import AppInput from "../Components/AppInput"
import show from "../../assets/visibilityDark.svg"
import hide from "../../assets/visibilityOffDark.svg"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import { authApi } from "../Config/Api.js"

const validationSchema = Yup.object().shape({
  fname: Yup.string().required().min(3).max(16).label("First Name"),
  lname: Yup.string().required().min(3).max(16).label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(12).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required()
    .label("Confirm Password"),
})

function RegisterScreen() {
  const [visibility, setVisibility] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="loginContainer">
      <h1 className="loginHeader">Register</h1>
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            delete values.confirmPassword
            console.log(values)

            const result = await authApi.post("/register", values)
            console.log(result.data)

            toast.success("Successfully registered. Please login to continue")

            setTimeout(() => {
              navigate("/login")
            }, 2000)
          } catch (error) {
            console.error("Error occurred, please try again:", error.message)
            toast.error("Error occurred, please try again")
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="formContainer">
            <AppInput
              type="text"
              name="fname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fname}
              placeholder="First Name"
            />
            {errors.fname && touched.fname && errors.fname}
            <p className="inputSeparator"></p>
            <AppInput
              type="text"
              name="lname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lname}
              placeholder="Last Name"
            />
            {errors.lname && touched.lname && errors.lname}
            <p className="inputSeparator"></p>
            <AppInput
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email"
            />
            {errors.email && touched.email && errors.email}
            <p className="inputSeparator"></p>
            <AppInput
              type={visibility ? "text" : "password"}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password"
              src={visibility ? hide : show}
              onClick={() => setVisibility((prevState) => !prevState)}
            />
            {errors.password && touched.password && errors.password}
            <p className="inputSeparator"></p>
            <AppInput
              type={visibility ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              placeholder="Confirm Password"
              //   src={visibility ? hide : show}
              //   onClick={() => setVisibiity((prevState) => !prevState)}
            />
            {errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword}
            <p className="inputSeparator"></p>
            <button
              style={{
                opacity: isSubmitting ? 0.5 : 1,
              }}
              type="submit"
              disabled={isSubmitting}
              className="loginButton"
            >
              Register
            </button>
          </form>
        )}
      </Formik>
      <Toaster richColors expand={false} position="bottom-center" />
    </div>
  )
}

export default RegisterScreen
