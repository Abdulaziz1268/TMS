import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { useContext } from "react"

import "./App.css"
import AdminScreen from "./app/Admin/AdminScreen"
import { AuthContext, AuthProvider } from "./app/Contexts/Auth"
import Bid from "./app/Components/Bid"
import Detail from "./app/Components/Detail"
import Home from "./app/Vendor/Home"
import LoginScreen from "./app/Authentication/LoginScreen"
import RegisterScreen from "./app/Authentication/RegisterScreen"
import TenderDetail from "./app/Vendor/TenderDetail"
import { UserContext } from "./app/Contexts/UserContext"
import VendorScreen from "./app/Vendor/VendorScreen"
import AdminTenderList from "./app/Admin/AdminTenderList"
import EditTender from "./app/Admin/EditTender"

function App() {
  return (
    <UserContext>
      <AuthProvider>
        <AppRoutes />
        <Toaster richColors expand={false} position="bottom-center" />
      </AuthProvider>
    </UserContext>
  )
}

const AppRoutes = () => {
  const { isAuth, isAdmin, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Loading...</div> // Prevents redirect before authentication is checked
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/vendor"
        element={isAuth ? <VendorScreen /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={isAdmin ? <AdminScreen /> : <Navigate to="/login" />}
      />
      <Route
        path="/Detail"
        element={isAdmin ? <Detail /> : <Navigate to="/login" />}
      />
      <Route
        path="/EditTender"
        element={isAdmin ? <EditTender /> : <Navigate to="/login" />}
      />
      <Route
        path="/tenders"
        element={isAdmin ? <AdminTenderList /> : <Navigate to="/login" />}
      />
      <Route
        path="/bid"
        element={isAuth ? <Bid /> : <Navigate to="/login" />}
      />
      <Route
        path="/tenderDetail"
        element={isAuth ? <TenderDetail /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>
  )
}

export default App
