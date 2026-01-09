type buttonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
};

const Button = ({ children, onClick, variant = 'primary' }: buttonProps) => {
    const style = {
        primary: {
            backgroundColor: 'blue',
            color: 'white',
        },
        secondary: {
            backgroundColor: 'gray',
            color: 'black',
        },
    };

    return (
        <button
            onClick={onClick}
            style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                ...style[variant],
            }}
            >
            {children}
            </button>
    );
};

export default Button;