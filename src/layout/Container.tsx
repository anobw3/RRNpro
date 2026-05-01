import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
<<<<<<< HEAD
  maxW?: "max-w-7xl" | "max-w-screen-xl" | "max-w-screen-2xl" | "max-w-full";
=======
  maxW?: "max-w-7xl" | "max-w-screen-xl" | "max-w-screen-2xl" | "max-w-full" | "max-w-[1200px]";
>>>>>>> 17e96eb (first commit)
}

export default function Container({ 
  children, 
  className = "", 
<<<<<<< HEAD
  maxW = "max-w-7xl" 
}: ContainerProps) {
  return (
    <div className={`${maxW} mx-auto px-4 sm:px-6 md:px-8 w-full ${className}`}>
=======
  maxW = "max-w-[1200px]" 
}: ContainerProps) {
  return (
    <div className={`${maxW} mx-auto px-4 w-full ${className}`}>
>>>>>>> 17e96eb (first commit)
      {children}
    </div>
  );
}
