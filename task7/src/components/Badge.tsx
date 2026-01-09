type badgeProps = {
    label: string;
};

const Badge = ({ label }: badgeProps) => {
    return (
        <span
            style={{
                padding: "4px 8px",
                borderRadius: 4,
                backgroundColor: "#e0e0e0",
                color: "#333",
                fontSize: "12px",
            }}
        >
            {label}
        </span>
    );
};

export default Badge;