import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import "../../App"
import { adminApi } from "../Config/Api"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [tenderCount, setTenderCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [highestBid, setHighestBid] = useState(0)
  const [bidsData, setBidsData] = useState([])
  const [tendersData, setTendersData] = useState([])

  useEffect(() => {
    adminApi
      .get("/tenderList")
      .then((result) => {
        setTenderCount(result.data.length)
        setTendersData(result.data)

        let maxBid = 0
        const bids = []
        result.data.forEach((tender) => {
          tender.bids.forEach((bid) => {
            bids.push(bid.bidAmount)
            if (bid.bidAmount > maxBid) {
              maxBid = bid.bidAmount
            }
          })
        })
        setBidsData(bids)
        setHighestBid(maxBid)
      })
      .catch((error) => console.log(error.message))

    adminApi
      .get("/userList")
      .then((result) => setUserCount(result.data.length))
      .catch((error) => console.log(error.message))
  }, [])

  const tendersChartData = {
    labels: tendersData.map((tender) => tender.title),
    datasets: [
      {
        label: "Number of Bids per Tender",
        data: tendersData.map((tender) => tender.bids.length),
        backgroundColor: "cornflowerblue",
        borderColor: "cornflowerblue",
        borderWidth: 1,
      },
    ],
  }

  const bidsChartData = {
    labels: bidsData.map((_, index) => `Bid ${index + 1}`),
    datasets: [
      {
        label: "Bid Amounts",
        data: bidsData,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat">
          <h3>Number of Tenders</h3>
          <p>{tenderCount}</p>
        </div>
        <div className="stat">
          <h3>Number of Users</h3>
          <p>{userCount}</p>
        </div>
        <div className="stat">
          <h3>Highest Tender Bid</h3>
          <p>${highestBid}</p>
        </div>
      </div>

      <div className="chartsContainer">
        <div className="chartWrapper">
          <h3>Bids Chart</h3>
          <Bar data={bidsChartData} options={chartOptions} />
        </div>
        <div className="chartWrapper">
          <h3>Tenders Chart</h3>
          <Bar data={tendersChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
