import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OpenCampaign(props: any) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/campaign?order=desc")
      .then((res) => setData(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const { donations, end_date, goal_amount, orchestraId, id, title }: any =
    data[0];

  const getSum = (donations: any) => {
    let sum = 0;
    for (let i = 0; i < donations.length; i++) {
      sum += donations[i].amount;
    }
    return sum;
  };

  const amountRaised = getSum(donations);

  const barPercent = (amountRaised / goal_amount) * 100;

  const progress = {
    width: barPercent + "%",
    height: "12px",
    backgroundColor: "#862866",
    opacity: "50%",
    borderRadius: "12px",
  };

  return (
    <div className="campaign-container">
      <div className="campaign-header">
        <h3 className="campaign-title">Campaña Abierta</h3>
        <p className="campaign-subtitle">Campaña</p>
        <p className="campaign-desc">{title}</p>
        <p className="read-more">
          <Link
            href={`/orchestras/${encodeURIComponent(
              orchestraId
            )}/campaigns/${encodeURIComponent(id)}`}
          >
            leer más
          </Link>
        </p>
      </div>
      <div className="campaign-details">
        <p className="campaign-goal-title">Objetivo</p>
        <p className="campaign-goal-amount">${goal_amount.toLocaleString()}</p>
        <p className="campaign-end-title">Finaliza:</p>
        <p className="campaign-end-date">{end_date}</p>
      </div>
      <div className="campaign-footer">
        <p className="campaig-footer-title">Alcanzado hasta el momento</p>
        <p className="campaign-current-amount">
          ${amountRaised.toLocaleString()}
        </p>
        <div className="campaign-progress-bar">
          <div className="campaign-current-progress-bar" style={progress}></div>
        </div>
        <Link
          href={`/orchestras/${encodeURIComponent(
            orchestraId
          )}/campaigns/${encodeURIComponent(id)}`}
          className="campaign-btn"
        >
          Colaborar
        </Link>
      </div>
    </div>
  );
}
