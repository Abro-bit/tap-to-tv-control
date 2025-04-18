
import React from "react";
import { cn } from "@/lib/utils";

interface IOSButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "default";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const IOSButton = ({
  children,
  onClick,
  className,
  variant = "default",
  size = "md",
  disabled = false,
}: IOSButtonProps) => {
  // Base styles
  const baseStyles = "rounded-full flex items-center justify-center transition-all";
  
  // Size styles
  const sizeStyles = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12",
    lg: "h-16 w-16 text-lg",
  };
  
  // Variant styles
  const variantStyles = {
    primary: "bg-blue-500 text-white shadow-sm active:bg-blue-600 active:scale-95",
    secondary: "bg-gray-200 text-gray-800 shadow-sm active:bg-gray-300 active:scale-95",
    default: "bg-gray-100 text-gray-800 shadow-sm active:bg-gray-200 active:scale-95",
  };
  
  // Disabled styles
  const disabledStyles = disabled 
    ? "opacity-50 pointer-events-none" 
    : "hover:shadow-md";

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        disabledStyles,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default IOSButton;
