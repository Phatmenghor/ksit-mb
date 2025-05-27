"use client";

import { useState, useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown, Calendar, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface YearSelectorProps {
  value: number;
  onChange: (year: number) => void;
  minYear?: number; // Optional minimum year limit
  maxYear?: number; // Optional maximum year limit
  title?: string;
}

export function YearSelector({
  value,
  onChange,
  minYear = 2020,
  maxYear = 2080,
  title = "Academy year",
}: YearSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    value === 0 ? "" : value.toString()
  );
  const [visibleYears, setVisibleYears] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize visible years around the current value
  useEffect(() => {
    setInputValue(value === 0 ? "" : value.toString());
    const currentYear = value !== 0 ? value : new Date().getFullYear();
    generateVisibleYears(currentYear);
  }, [value]);

  // Generate 20 years centered around the specified center year
  const generateVisibleYears = (centerYear: number) => {
    const years = [];
    const start = Math.max(minYear, centerYear - 10);
    const end = Math.min(maxYear, centerYear + 10);

    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    setVisibleYears(years);
  };

  // Load more years when scrolling
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
    const isNearTop = scrollTop <= 50;

    if (isNearBottom) {
      // Add more years at the end
      const lastYear = visibleYears[visibleYears.length - 1];
      if (lastYear < maxYear) {
        const additionalYears = Array.from(
          { length: 5 },
          (_, i) => lastYear + i + 1
        ).filter((year) => year <= maxYear);

        setVisibleYears([...visibleYears, ...additionalYears]);
      }
    }

    if (isNearTop) {
      // Add more years at the beginning
      const firstYear = visibleYears[0];
      if (firstYear > minYear) {
        const additionalYears = Array.from(
          { length: 5 },
          (_, i) => firstYear - 5 + i
        ).filter((year) => year >= minYear);

        setVisibleYears([...additionalYears, ...visibleYears]);

        // Maintain scroll position when adding items at the top
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 150;
        }
      }
    }
  };

  // Handle direct input of a year
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      // Allow only digits
      setInputValue(newValue);
    }
  };

  const handleInputBlur = () => {
    // If input is empty, keep the current value (including 0 for "no selection")
    if (inputValue.trim() === "") {
      setInputValue(value === 0 ? "" : value.toString());
      return;
    }

    let yearValue = parseInt(inputValue, 10);

    if (isNaN(yearValue)) {
      // Reset to current value if invalid input
      setInputValue(value === 0 ? "" : value.toString());
      return;
    }

    // Only apply min/max constraints if a valid year was entered
    if (yearValue < minYear || yearValue > maxYear) {
      yearValue = Math.max(minYear, Math.min(maxYear, yearValue));
    }

    setInputValue(yearValue.toString());
    onChange(yearValue);
    generateVisibleYears(yearValue);
  };

  // Handle direct selection of a year
  const selectYear = (year: number) => {
    onChange(year);
    setInputValue(year.toString());
    setIsOpen(false);
  };

  // Increment/decrement year buttons
  const incrementYear = () => {
    if (value < maxYear) {
      const newYear = value + 1;
      onChange(newYear);
      setInputValue(newYear.toString());
    }
  };

  const decrementYear = () => {
    if (value > minYear) {
      const newYear = value - 1;
      onChange(newYear);
      setInputValue(newYear.toString());
    }
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex-1">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isOpen}
              className="w-full justify-between"
            >
              {value === 0 ? title : `${title}: ${value}`}
              <Calendar className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <div className="flex items-center p-3 border-b">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={decrementYear}
                disabled={value <= minYear}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInputBlur();
                    setIsOpen(false);
                  }
                }}
                className="h-8 w-20 text-center mx-2"
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={incrementYear}
                disabled={value >= maxYear}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="max-h-52 overflow-y-auto"
            >
              <div className="grid grid-cols-4 gap-1 p-2">
                {visibleYears.map((year) => (
                  <Button
                    key={year}
                    variant="ghost"
                    className={cn(
                      "h-8 px-2",
                      year === value
                        ? "bg-[#14532D] text-white hover:bg-[#14532D]/90"
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => selectYear(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
