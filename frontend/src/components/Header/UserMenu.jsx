import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// User menu dropdown shown in the header (avatar + logout)
const UserMenu = () => {
  // Get current user data and logout function from auth context
  const { user, logout } = useAuth();

  // Controls whether the dropdown menu is open or closed
  const [open, setOpen] = useState(false);

  // Reference to the menu container for detecting outside clicks
  const ref = useRef(null);

  const initial = user?.email?.charAt(0).toUpperCase();
  const navigate = useNavigate();

  // Close the dropdown when clicking outside of the menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      // If the click is outside the menu container, close the dropdown
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    // Listen for mouse clicks anywhere on the page
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center"
      >
        <p>{initial}</p>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border bg-background shadow-md z-50">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-muted"
          >
            Profile
          </button>
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-muted text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
