import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import type { User } from "firebase/auth";

import "./navbar.css";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (currentUser: User | null) => {
        setUser(currentUser);
      }
    );

    return () => unsub();
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      navigate("/login");
    } finally {
      setOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          N
        </Link>
      </div>

      {/* Desktop menu */}
      {user && (
        <ul className="nav-links desktop">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movie">Movie</NavLink>
          </li>
          <li>
            <NavLink to="/tv">TV Shows</NavLink>
          </li>
          <li>
            <NavLink to="/list">List</NavLink>
          </li>
        </ul>
      )}

      {/* Mobile menu icon */}
      <div className="menu-icon" onClick={() => setOpen((prev) => !prev)}>
        ☰
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {user ? (
          <>
            <span>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </span>
            <span>
              <Link to="/movie" onClick={() => setOpen(false)}>
                Movies
              </Link>
            </span>
            <span>
              <Link to="/tvshows" onClick={() => setOpen(false)}>
                TV Shows
              </Link>
            </span>
            <span>
              <Link to="/list" onClick={() => setOpen(false)}>
                My List
              </Link>
            </span>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>
              Sign In
            </Link>
            <Link to="/signup" className="signup" onClick={() => setOpen(false)}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
