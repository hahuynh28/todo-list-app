import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center"
      >
        <p>{user?.email}</p>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border bg-background shadow-md">
          <button
            disabled
            className="w-full px-4 py-2 text-left text-sm text-muted-foreground cursor-not-allowed"
          >
            Profile
          </button>
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-left text-sm hover:bg-muted"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
