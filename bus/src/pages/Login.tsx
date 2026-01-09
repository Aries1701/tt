import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err: any) {
            alert("Sai email hoặc mật khẩu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <h2>Đăng nhập</h2>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <p>
                Chưa có tài khoản <Link to="/signup">Đăng kí</Link>
            </p>
        </div>
    );
}