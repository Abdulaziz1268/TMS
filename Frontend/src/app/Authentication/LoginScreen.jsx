import { Formik } from "formik"
import React, { useContext, useState } from "react"
import * as Yup from "yup"
import AppInput from "../Components/AppInput"
import show from "../../assets/visibilityDark.svg"
import hide from "../../assets/visibilityOffDark.svg"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AuthContext } from "../Contexts/Auth"
import { authApi } from "../Config/Api"

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(12).required().label("Password"),
})

function LoginScreen() {
  const [visibility, setVisibiity] = useState(false)
  const { setIsAuth, setIsAdmin } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div className="loginContainer">
      <h1 className="loginHeader">LOGIN</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const result = await authApi.post("/login", values)
            console.log(result.data)

            const { token, role, _id } = result.data
            localStorage.setItem("userId", _id)
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)

            toast.success("successful")
            setIsAuth(true)

            setTimeout(() => {
              if (result.data.role === "admin") {
                setIsAdmin(true)
                navigate("/admin")
              } else {
                navigate("/vendor")
              }
            }, 1000)
          } catch (error) {
            console.log(error)
            toast.error(error.message + "invalid")
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
              onClick={() => setVisibiity((prevState) => !prevState)}
            />
            {errors.password && touched.password && errors.password}
            <p className="inputSeparator"></p>
            <button
              style={{
                opacity: isSubmitting ? 0.5 : 1,
              }}
              type="submit"
              disabled={isSubmitting}
              className="loginButton"
            >
              Login
            </button>
          </form>
        )}
      </Formik>
      <div className="registerLinkContainer">
        <p>
          you don't have account? click <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginScreen
