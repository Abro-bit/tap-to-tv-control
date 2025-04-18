
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RemoteButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  className?: string;
}

const RemoteButton = ({ 
  icon, 
  onClick, 
  color = "default",
  className 
}: RemoteButtonProps) => {
  let buttonStyle = "bg-gray-100 hover:bg-gray-200 text-gray-700";
  
  if (color === "red") {
    buttonStyle = "bg-red-500 hover:bg-red-600 text-white";
  } else if (color === "blue") {
    buttonStyle = "bg-blue-500 hover:bg-blue-600 text-white";
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-10 w-10 rounded-full flex items-center justify-center",
        buttonStyle,
        className
      )}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default RemoteButton;
