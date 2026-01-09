import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "../utils/firebase";
import "./signup.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (User: User | null) => {
      if (User) navigate("/");
    });
    return unsub();
  }, [navigate]);

  const handleNext = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email.trim()) { setStep(2);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error)
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={step === 1 ? handleNext : handleSignup}>
        <h1>{step === 1 ? "Create Account" : "Set Password"}</h1>

        {step === 1 && (
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        )}

        {step === 2 && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        )}

        <button type="submit">
          {step === 1 ? "Get Started" : "Sign Up"}
        </button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
