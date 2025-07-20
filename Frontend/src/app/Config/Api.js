import axios from "axios"
import { toast } from "sonner"

export const adminApi = axios.create({
  baseURL: "http://localhost:2005/api/admin",
})

export const authApi = axios.create({
  baseURL: "http://localhost:2005/api/auth",
})

export const vendorApi = axios.create({
  baseURL: "http://localhost:2005/api/vendor",
})

export const paymentApi = axios.create({
  baseURL: "http://localhost:2005/api/payment",
})

export const BASE_URL = "http://localhost:2005" // for serving files and images

const authReqInterceptor = (req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
}

const authSuccessResInterceptor = (response) => response
const authErrorResInterceptor = (error) => {
  if (error.response?.status === 401) {
    localStorage.clear()
    toast.error("Your token is Expired Please login.")
    window.location.href = "/login"
  }
  return Promise.reject(error)
}

vendorApi.interceptors.request.use(authReqInterceptor)
vendorApi.interceptors.response.use(
  authSuccessResInterceptor,
  authErrorResInterceptor
)
adminApi.interceptors.request.use(authReqInterceptor)
adminApi.interceptors.response.use(
  authSuccessResInterceptor,
  authErrorResInterceptor
)
authApi.interceptors.request.use(authReqInterceptor)
authApi.interceptors.response.use(
  authSuccessResInterceptor,
  authErrorResInterceptor
)
paymentApi.interceptors.request.use(authReqInterceptor)
paymentApi.interceptors.response.use(
  authSuccessResInterceptor,
  authErrorResInterceptor
)
