import React from "react";
import { CheckSquare } from "lucide-react";

const AppLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <CheckSquare className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold text-foreground">Todo</span>
    </div>
  );
};

export default AppLogo;
