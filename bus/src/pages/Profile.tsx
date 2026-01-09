import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../styles/profile.css";
import { useUserProfile } from "../hooks/useUserProfile";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // ✅ THÊM
    const navigate = useNavigate();
    const profile = useUserProfile();

    // ================= AVATAR =================
    const uploadAvatar = async () => {
        const url = prompt("Nhập link ảnh avatar");
        if (!url || !auth.currentUser) return;

        const userRef = doc(db, "users", auth.currentUser.uid);

        // ✅ setDoc + merge để KHÔNG bị lỗi "No document to update"
        await setDoc(
            userRef,
            { avatar: url },
            { merge: true }
        );
    };

    // ================= AUTH =================
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false); // ✅ QUAN TRỌNG
        });

        return () => unsub();
    }, []);

    // ✅ CHỜ FIREBASE LOAD XONG
    if (loading) {
        return <div style={{ padding: 20 }}>Đang tải...</div>;
    }

    return (
        <div className="profile-page">
            {/* ===== HEADER ===== */}
            <div className="profile-header">
                <div
                    className="avatar"
                    onClick={user ? uploadAvatar : undefined}
                    style={{
                        backgroundImage: profile?.avatar
                            ? `url(${profile.avatar})`
                            : undefined,
                        cursor: user ? "pointer" : "default",
                    }}
                />

                <div>
                    {user ? (
                        <>
                            <h3>{user.email}</h3>
                            <p>Tài khoản đã đăng nhập</p>
                        </>
                    ) : (
                        <>
                            <h3
                                className="login-text"
                                onClick={() => navigate("/login")}
                            >
                                Đăng nhập hoặc Đăng ký
                            </h3>
                            <p>Đăng nhập để nhận ưu đãi</p>
                        </>
                    )}
                </div>
            </div>

            {/* ===== REWARDS ===== */}
            <div className="card">
                <strong>Rewards</strong>
                <p>Nhận phần thưởng & ưu đãi độc quyền</p>
            </div>

            {/* ===== STATS ===== */}
            <div className="card row-3">
                <div>
                    <strong>-</strong>
                    <span>Mã ưu đãi</span>
                </div>
                <div>
                    <strong>-</strong>
                    <span>Xu</span>
                </div>
                <div>
                    <strong>-</strong>
                    <span>Gift Card</span>
                </div>
            </div>

            {/* ===== MENU ===== */}
            <div className="card">
                <MenuItem label="Đơn hàng" />
                <MenuItem label="Thông tin thường dùng" />
            </div>

            <div className="card">
                <MenuItem label="Trợ giúp" />
                <MenuItem label="Đánh giá ứng dụng" />
                <MenuItem label="Cài đặt" />
            </div>

            {/* ===== LOGOUT ===== */}
            {user && (
                <button
                    className="logout-btn"
                    onClick={() => signOut(auth)}
                >
                    Đăng xuất
                </button>
            )}
        </div>
    );
}

function MenuItem({ label }: { label: string }) {
    return (
        <div className="menu-item">
            <span>{label}</span>
            <span>›</span>
        </div>
    );
}
