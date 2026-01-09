import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            setLoading(true);
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db, "user", res.user.uid), {
                email,
                avatar: "",
                favorites: [],
            });
            navigate("/");
        } catch (err: any) {
            alert(err.mesage);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="auth-page">
            <h2>Đăng ký</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSignup} disabled={loading}>
                {loading ? "Đang xử lý ..." : "Đăng ký"}
            </button>

            <p>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
        </div>
    );
};
