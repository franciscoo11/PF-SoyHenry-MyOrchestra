import styled from "styled-components";
import { CiCalendar } from "react-icons/ci";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import Link from "next/link";

const StyledEventCard = styled.div`
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 12px;

  .event-header {
    width: 100%;
    padding: 12px 18px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: flex-start;
    gap: 12px;

    .event-calendar-icon {
      font-size: 6em;
      color: ${({ theme }) => theme.colors.secondary};
      margin: 0;
      display: flex;
      align-items: center;
    }

    .event-header-content {
      width: 100%;

      p,
      h2 {
        margin: 0;
      }

      a.read-more {
        display: block;
        color: ${({ theme }) => theme.colors.secondary};
        text-align: right;
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

export default function EventHomeCard({ evento }: any) {
  const { title, content, event_date, event_hour, orchestraId } = evento;
  return (
    <StyledEventCard>
      <div className="event-header">
        <div className="event-calendar-icon">
          <CiCalendar />
        </div>
        <div className="event-header-content">
          <h2 className="event-title">
            <Link
              href={`/orchestras/${encodeURIComponent(orchestraId)}/events`}
              className="link"
            >
              {title}
            </Link>
          </h2>
          <p className="event-date">
            {event_date} - {event_hour}
          </p>
          <p className="event-description">{content}</p>
          <Link
            href={`/orchestras/${encodeURIComponent(orchestraId)}/events`}
            className="link read-more"
          >
            Ver mas...
          </Link>
        </div>
      </div>
    </StyledEventCard>
  );
}
