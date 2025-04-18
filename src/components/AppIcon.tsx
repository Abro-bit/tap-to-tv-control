
import React from "react";
import { Tv } from "lucide-react";

const AppIcon = () => {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
        <Tv className="h-8 w-8 text-white" />
      </div>
      <h2 className="text-sm font-medium text-gray-500 mt-2">Universal Remote</h2>
    </div>
  );
};

export default AppIcon;
