"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  value?: number[];
  onValueChange?: (value: number[]) => void;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, defaultValue = [25, 75], value, onValueChange, ...props }, ref) => {
    const [values, setValues] = useState<number[]>(value || defaultValue);
    const [isDragging, setIsDragging] = useState<number | null>(null);

    useEffect(() => {
      if (value) {
        setValues(value);
      }
    }, [value]);

    const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
      setIsDragging(index);
    };

    const calculateNewValue = (clientX: number): number => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return values[isDragging ?? 0];
      
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const newValue = Math.round((percentage * (max - min) + min) / step) * step;
      
      return newValue;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging === null) return;
      
      const newValue = calculateNewValue(e.clientX);
      const newValues = [...values];
      newValues[isDragging] = newValue;
      
      // Ensure values don't cross
      if (isDragging === 0 && newValue > values[1]) {
        newValues[isDragging] = values[1];
      } else if (isDragging === 1 && newValue < values[0]) {
        newValues[isDragging] = values[0];
      }
      
      setValues(newValues);
      onValueChange?.(newValues);
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    useEffect(() => {
      if (isDragging !== null) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDragging, values]);

    const trackRef = React.useRef<HTMLDivElement>(null);

    const getLeftPercentage = (index: number): number => {
      return ((values[index] - min) / (max - min)) * 100;
    };

    return (
      <div
        ref={ref}
        className={cn("relative w-full h-6 flex items-center", className)}
        {...props}
      >
        <div 
          ref={trackRef}
          className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200"
        >
          <div 
            className="absolute h-full bg-[#AB213B]"
            style={{
              left: `${getLeftPercentage(0)}%`,
              width: `${getLeftPercentage(1) - getLeftPercentage(0)}%`,
            }}
          />
        </div>
        
        {values.map((_, i) => (
          <div
            key={i}
            className="absolute h-4 w-4 rounded-full border border-[#AB213B] bg-white cursor-pointer"
            style={{ left: `calc(${getLeftPercentage(i)}% - 8px)` }}
            onMouseDown={handleMouseDown(i)}
          />
        ))}
      </div>
    );
  }
)

Slider.displayName = "Slider"; 