type CardProps = {
    children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
    return (
        <div
        style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
        }}
        >
        {children}
        </div>
    );
};

export default Card;