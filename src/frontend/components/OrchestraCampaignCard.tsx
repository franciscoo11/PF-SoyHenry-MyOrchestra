import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FiTarget, FiCalendar, FiSmile } from "react-icons/fi";

const StyledEventCard = styled.div`
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 12px;

  .campaign-header {
    padding: 12px 18px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 12px;

    .campaign-calendar-icon {
      font-size: 2.5em;
      color: ${({ theme }) => theme.colors.secondary};
      margin: 0;
      display: flex;
      align-items: center;
    }

    .campaign-header-content {
      p,
      h2 {
        margin: 0;
      }

      .campaign-title {
        color: ${({ theme }) => theme.colors.secondary};
        font-weight: normal;
        font-size: 1.2em;
      }

      .campaign-date {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 0.9em;
      }
    }
  }

  .campaign-image {
    height: 16em;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .campaign-details {
    padding: 12px 24px;
    .campaign-description {
      color: gray;
    }
    .campaign-details-title {
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: 500;
    }

    .detail {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-content: center;
      gap: 10px;
      margin: 6px 0;

      p {
        margin: 0;
      }
      .detail-icon {
        color: ${({ theme }) => theme.colors.secondary};
        font-size: 1.4em;
        display: flex;
        align-items: center;
      }
      .detail-text {
        display: flex;
        align-items: center;
        font-size: 0.9em;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

interface CampaignCardModel {
  title: string;
  end: string;
  image: string;
  description: string;
  goal: number;
}

export default function OrchestraCampaignCard({
  title,
  end,
  image,
  description,
  goal,
}: CampaignCardModel) {
  return (
    <StyledEventCard>
      <div className="campaign-header">
        <div className="campaign-calendar-icon">
          <FaHeart />
        </div>
        <div className="campaign-header-content">
          <h2 className="campaign-title">{title}</h2>
          <p className="campaign-date">Finaliza: {end}</p>
        </div>
      </div>

      <div
        className="campaign-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="campaign-details">
        <p className="campaign-description">{description}</p>
        <h3 className="campaign-details-title">Detalles</h3>
        <div className="detail">
          <div className="detail-icon">
            <FiTarget />
          </div>
          <div className="detail-text">
            <b>Objetivo:&nbsp;</b>${goal.toLocaleString()}
          </div>
        </div>
        <div className="detail">
          <div className="detail-icon">
            <FiCalendar />
          </div>
          <div className="detail-text">
            <b>Finaliza:&nbsp;</b>
            {end}
          </div>
        </div>
        <div className="detail">
          <div className="detail-icon">
            <FiSmile />
          </div>
          <div className="detail-text">
            <b>Alcanzado:&nbsp;</b> ${(goal - 10000).toLocaleString()}
          </div>
        </div>
      </div>
    </StyledEventCard>
  );
}
