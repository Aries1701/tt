import "./DestinationCard.css"

interface Props {
  destination: {
    name: string;
    image: string;
  };
  active: boolean;
  onClick: () => void;
}

export default function DestinationCard({
  destination,
  active,
  onClick,
}: Props) {
  return (
    <div
      className={`destination-card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <img src={destination.image} alt={destination.name} />
      <div className="overlay">
        <span>{destination.name}</span>
      </div>
    </div>
  );
}

