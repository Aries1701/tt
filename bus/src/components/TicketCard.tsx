import "./TicketCard.css";

interface Props {
  title: string;
  location: string;
  rating?: number;
}

export default function TicketCard({ title, location, rating }: Props) {
  return (
    <div className="ticket-card">
      <div className="image-placeholder" />

      <div className="ticket-info">
        <span className="location">📍 {location}</span>
        <h4>{title}</h4>

        {rating && (
          <span className="rating">⭐ {rating}</span>
        )}
      </div>
    </div>
  );
}
