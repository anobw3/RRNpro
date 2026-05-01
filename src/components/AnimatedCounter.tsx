import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ value, duration = 2000, className }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const valueRef = useRef(value);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  const initialValueRef = useRef(value);

  const animate = (time: number) => {
    if (startTimeRef.current === null) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // Cubic out easing for smoother finish
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    
    const currentCount = Math.floor(initialValueRef.current + (valueRef.current - initialValueRef.current) * easeOutCubic);
    
    setDisplayValue(currentCount);

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (value !== valueRef.current) {
      initialValueRef.current = displayValue;
      valueRef.current = value;
      startTimeRef.current = null;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [value]);

  return <span className={className}>{displayValue.toLocaleString()}</span>;
}
