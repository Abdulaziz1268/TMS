// import { useContext } from "react"
// import { useNavigate } from "react-router-dom"
// import { AuthContext } from "../Contexts/Auth"

// function Home() {
//   const navigate = useNavigate()
//   const { isAuth } = useContext(AuthContext)
//   return (
//     <div className="homeContainer">
//       <nav className="homeNav">
//         <h2 className="homeHeader">Home</h2>
//         {isAuth ? (
//           <h3 style={{ color: "cornflowerblue" }}>
//             Welcome {localStorage.getItem("fname")}
//           </h3>
//         ) : (
//           <div className="signContainer">
//             <h3 className="sign in" onClick={() => navigate("/login")}>
//               Signin
//             </h3>
//             <h3 className="sign" onClick={() => navigate("/register")}>
//               Signup
//             </h3>
//           </div>
//         )}
//       </nav>
//       <main className="homeMain">
//         <h1 className="mainHeader">Welcome to the Tender Management System</h1>
//         <button className="tenderButton" onClick={() => navigate("/vendor")}>
//           <h2>Go to Tenders</h2>
//         </button>
//       </main>
//     </div>
//   )
// }

// export default Home

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Contexts/Auth"

function Home() {
  const navigate = useNavigate()
  const { isAuth } = useContext(AuthContext)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-6 flex justify-between items-center shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Home</h2>
        {isAuth ? (
          <h3 className="text-blue-600 text-lg font-medium bg-blue-50 px-4 py-2 rounded-full">
            Welcome {localStorage.getItem("fname")} 👋
          </h3>
        ) : (
          <div className="flex space-x-6">
            <h3
              className="text-gray-700 hover:text-blue-600 cursor-pointer font-semibold transition-all duration-200 hover:scale-105 px-4 py-2 rounded-lg hover:bg-blue-50"
              onClick={() => navigate("/login")}
            >
              Signin
            </h3>
            <h3
              className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer font-semibold transition-all duration-200 hover:scale-105 px-4 py-2 rounded-lg shadow-md"
              onClick={() => navigate("/register")}
            >
              Signup
            </h3>
          </div>
        )}
      </nav>
      <main className="flex flex-col items-center gap-5 justify-center pt-10  px-6 text-center">
        <div className="max-w-3xl mb-15">
          <h1 className="text-5xl font-bold text-gray-900 mb-16 leading-tight">
            Welcome to the{" "}
            <span className="text-blue-600">Tender Management System</span>
          </h1>
          <p className="text-xl text-gray-600 mx-12 max-w-2xl leading-relaxed">
            Streamline your tender process with our comprehensive management
            solution. Efficient, reliable, and easy to use.
          </p>
        </div>

        {/* Feature cards */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 mt-20 max-w-6xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/50">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Manage Tenders
            </h3>
            <p className="text-gray-600">
              Create and manage tender documents efficiently
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/50">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Fast Processing
            </h3>
            <p className="text-gray-600">
              Quick and streamlined tender processing
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/50">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-600">
              Your data is safe with our secure platform
            </p>
          </div>
          <div className="w-full flex justify-center">
            <button
              className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => navigate("/vendor")}
            >
              <h2 className="text-lg">Explore Tenders →</h2>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
