import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "sonner"

function Card({ badge, src, subTitle, title, tender }) {
  const navigate = useNavigate()
  return (
    <div
      className="cardContainer hover:scale-105 duration-300 ease-in-out hover:cursor-pointer"
      onClick={() => {
        tender.status == "close"
          ? toast.error("the tender is closed")
          : navigate("/tenderDetail", { state: { tender } })
      }}
    >
      <div className="cardImageContainer">
        <img src={src} className="cardImage" />
      </div>
      <div className="cardDetail">
        <div className="titleContainer">
          <h3 className="cardTitle">{title}</h3>
          <p
            className="badge"
            style={{ backgroundColor: badge === "open" ? "green" : "red" }}
          >
            {badge}
          </p>
        </div>
        <p className="cardSubTitle">{subTitle}</p>
      </div>
    </div>
  )
}

export default Card
