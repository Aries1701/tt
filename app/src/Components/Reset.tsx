import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";
import "./reset.css";
import { FirebaseError } from "firebase/app";

const Reset: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>)
  : Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Please check your Email!");
      navigate("/login");
    } catch (error) {
      const err = error as FirebaseError;
      console.log(err);

      if (err.code === "auth/user-not-found") {
        alert("Email không tồn tại");
      } else if (err.code === "auth/invalid-email") {
        alert("Email không hợp lệ");
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="reset-page">
    <div className="reset-overlay">
      <div className="reset-wrapper">
        <form className="reset-box" onSubmit={handleReset}>
          <h2>Reset Password</h2>

          <p className="reset-desc">
            Enter your email and we’ll send you a reset link.
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </button>

          <p className="reset-footer">
            Remember your password?{" "}
            <span onClick={() => navigate("/login")}>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  </div>
);

}

export default Reset;
