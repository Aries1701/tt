import "./Header.css"

export default function Header() {
    return (
    <header className="header">
        <div className="search-box">
            <span className="icon"> a</span>
            <input placeholder="Tìm chuyến xe" />
        </div>

        <div className="header-icon">
            {/* <span> b</span> */}
            <span> c</span>
        </div>
    </header>
    )
}