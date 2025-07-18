import axios from "axios"

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

const authInterceptor = (req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
}

vendorApi.interceptors.request.use(authInterceptor)
adminApi.interceptors.request.use(authInterceptor)
authApi.interceptors.request.use(authInterceptor)
paymentApi.interceptors.request.use(authInterceptor)
