import axios from "axios"
import { toast } from "sonner"

const REMOTE_URL = import.meta.env.VITE_REMOTE_URL
const LOCAL_URL = import.meta.env.VITE_LOCAL_URL

const cloud = true
export const BASE_URL = cloud ? REMOTE_URL : LOCAL_URL

export const adminApi = axios.create({
  baseURL: `${BASE_URL}/api/admin`,
})

export const authApi = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
})

export const vendorApi = axios.create({
  baseURL: `${BASE_URL}/api/vendor`,
})

export const paymentApi = axios.create({
  baseURL: `${BASE_URL}/api/payment`,
})

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
    setTimeout(() => {
      window.location.href = "/login"
    }, 1500)
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
