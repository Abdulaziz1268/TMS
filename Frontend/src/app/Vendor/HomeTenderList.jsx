import { useState, useEffect } from "react"

import Card from "../Components/Card"
import photo from "../../assets/placeholderimage1.png"
import searchPhoto from "../../assets/search.svg"
import { BASE_URL, vendorApi } from "../Config/Api"

function Tender() {
  const [tenders, setTenders] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setLoading(true)
    vendorApi
      .get("/tenderList")
      .then((result) => {
        setTenders(result.data)
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false))
  }, [])

  const filteredTenders = searchQuery
    ? tenders.filter(
        (tender) =>
          tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tender.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tenders // Show all tenders if searchQuery is empty

  return (
    <div className="tenderContainer">
      <div className="vendorHero">
        <h1 className="heroText">Bid On the tenders</h1>
        <div className="searchContainer">
          <input
            type="search"
            placeholder="Search tenders"
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={searchPhoto} alt="search icon" className="searchImage" />
        </div>
      </div>

      {!loading ? (
        filteredTenders.length > 0 ? (
          filteredTenders.map((tender) => (
            <Card
              key={tender._id}
              src={tender.image ? `${BASE_URL}${tender.image}` : photo}
              title={tender.title}
              subTitle={tender.description}
              tender={tender}
              badge={tender.status}
            />
          ))
        ) : (
          <p>No tenders found.</p>
        )
      ) : (
        <div className="w-full h-full flex justify-center pt-25">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </div>
  )
}

export default Tender
