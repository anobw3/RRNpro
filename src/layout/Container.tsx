import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxW?: "max-w-7xl" | "max-w-screen-xl" | "max-w-screen-2xl" | "max-w-full" | "max-w-[1200px]";
}

export default function Container({ 
  children, 
  className = "", 
  maxW = "max-w-[1200px]" 
}: ContainerProps) {
  return (
    <div className={`${maxW} mx-auto px-0 sm:px-6 lg:px-8 w-full ${className}`}>
      {children}
    </div>
  );
}
