import React from "react";
import AppLogo from "./AppLogo";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="py-4">
      <div className="container mx-auto flex items-center justify-between">
        <AppLogo />

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
