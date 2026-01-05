import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";

const Profile = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  if (!user) {
    return (
      <div className="bg-background flex items-center justify-center py-24">
        <p className="text-muted-foreground">Not logged in</p>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Updated name:", name);
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className=" flex justify-center pt-24 px-4">
        <div className="w-full max-w-sm bg-card rounded-xl shadow-md p-6 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-base font-semibold">Profile</h1>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-primary font-medium hover:underline"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-3 text-sm">
                <button
                  onClick={handleSave}
                  className="text-primary font-medium hover:underline"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setName(user.name || "");
                    setIsEditing(false);
                  }}
                  className="text-muted-foreground hover:underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold">
              {name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="block text-xs text-muted-foreground mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              readOnly={!isEditing}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-input border border-border rounded-md px-3 py-2 text-sm
              ${
                isEditing
                  ? "focus:outline-none focus:ring-2 focus:ring-primary"
                  : ""
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
