"use client";

import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function PaginationPage({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: CustomPaginationProps) {
  // Handle previous page
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  // Handle next page
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  // Generate page numbers to display
  const getPageNumbers = useCallback((): number[] => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      // Show all pages if there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      // Near the start
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Middle - show current page with 2 pages before and after
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  // Check if we should show ellipsis after page numbers
  const shouldShowEllipsis = useCallback((): boolean => {
    if (totalPages <= 5) return false;

    // Don't show ellipsis if we're showing pages 1-5 (near start)
    if (currentPage <= 3) return false;

    // Don't show ellipsis if we're showing the last 5 pages (near end)
    if (currentPage >= totalPages - 2) return false;

    // Show ellipsis when we're in the middle
    return true;
  }, [currentPage, totalPages]);

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`p-4 ${className}`}>
      {/* Desktop Pagination */}
      <div className="hidden md:block">
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-200"
                : "text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === pageNumber
                  ? "bg-black text-white"
                  : "text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {shouldShowEllipsis() && (
            <span className="px-2 text-gray-400">...</span>
          )}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-200"
                : "text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer"
            }`}
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Pagination - Matches the design in your image */}
      <div className="flex justify-center items-center gap-2 md:hidden">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-200"
              : "text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        {/* Show limited page numbers on mobile */}
        {(() => {
          const mobilePagesToShow = [];

          if (totalPages <= 4) {
            // Show all pages if 4 or fewer
            for (let i = 1; i <= totalPages; i++) {
              mobilePagesToShow.push(i);
            }
          } else {
            // Show current page and adjacent pages
            const start = Math.max(1, currentPage - 1);
            const end = Math.min(totalPages, currentPage + 1);

            for (let i = start; i <= end; i++) {
              mobilePagesToShow.push(i);
            }
          }

          return mobilePagesToShow.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === pageNumber
                  ? "bg-black text-white"
                  : "text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          ));
        })()}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-200"
              : "text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Next
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
