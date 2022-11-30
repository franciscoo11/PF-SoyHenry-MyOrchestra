import styled from "styled-components";
import { CiCalendar } from "react-icons/ci";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";

const StyledEventCard = styled.div`
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 12px;

  .event-header {
    padding: 12px 18px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 12px;

    .event-calendar-icon {
      font-size: 4em;
      color: ${({ theme }) => theme.colors.secondary};
      margin: 0;
      display: flex;
      align-items: center;
    }

    .event-header-content {
      p,
      h2 {
        margin: 0;
      }

      .event-title {
        color: ${({ theme }) => theme.colors.secondary};
        text-transform: uppercase;
        font-weight: normal;
        font-size: 1.2em;
      }

      .event-date {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 0.9em;
      }
    }
  }

  .event-image {
    height: 16em;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .event-details {
    padding: 12px 24px;
    .event-description {
      color: gray;
    }
    .event-details-title {
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

interface EventCardModel {
  title: string;
  day: string;
  hour: string;
  image: string;
  description: string;
}

export default function OrchestraEventCard({
  title,
  day,
  hour,
  image,
  description,
}: EventCardModel) {
  return (
    <StyledEventCard>
      <div className="event-header">
        <div className="event-calendar-icon">
          <CiCalendar />
        </div>
        <div className="event-header-content">
          <h2 className="event-title">{title}</h2>
          <p className="event-date">
            {day} - {hour}
          </p>
        </div>
      </div>

      {image ? (
        <div
          className="event-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      ) : null}
      <div className="event-details">
        <p className="event-description">{description}</p>
        <h3 className="event-details-title">Detalles</h3>
        {/* <div className="detail">
          <div className="detail-icon">
            <FiMapPin />
          </div>
          <div className="detail-text">{location}</div>
        </div> */}
        <div className="detail">
          <div className="detail-icon">
            <FiCalendar />
          </div>
          <div className="detail-text">{day}</div>
        </div>
        <div className="detail">
          <div className="detail-icon">
            <FiClock />
          </div>
          <div className="detail-text">{hour}</div>
        </div>
      </div>
    </StyledEventCard>
  );
}
