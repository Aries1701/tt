import "./CategoryMenu.css"

const item = [
    { icon: "a", label: "Di chuyển"},
    { icon: "b", label: "Thuê xe"},
    { icon: "c", label: "Tất cả"},
];

export default function CategoryMenu() {
    return (
        <div className="category-menu">
            {item.map((i) => (
                <div key={i.label} className="category-item">
                    <div className="icon">{i.icon}</div>
                    <span>{i.label}</span>
                </div>
            ))}
        </div>
    );
}