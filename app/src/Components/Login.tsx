import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) { navigate("/"); }
    });

    return () => unsubscribe();
  }
  );

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert("Email hoặc mật khẩu không đúng");
      console.log(error.code);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-wrapper">
          <form className="login-box" onSubmit={handleLogin}>
            <h2>Sign In</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="forgot-text">
              Forgot your password? <span onClick={() => navigate("/reset")}>Reset here</span>
            </p>

            <p className="signup-text">
              New here? <span onClick={() => navigate("/signup")}>Sign up now</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
