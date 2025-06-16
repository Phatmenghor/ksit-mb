// components/CourseCard.tsx

"use client";

import Image from "next/image";

interface CourseCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function CourseCard({
  imageSrc,
  title,
  description,
}: CourseCardProps) {
  return (
    <div className="w-full bg-[#fdf7ed] p-4 rounded-md flex items-center">
      <div className="relative h-10 w-10 mr-4 shrink-0">
        <div className="absolute inset-0 rounded-full border-2 border-[#024D3E] flex items-center justify-center overflow-hidden">
          <Image
            src={imageSrc}
            alt="Course logo"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-[#333] text-base font-medium">{title}</h1>
        <p className="text-[#666] text-sm">{description}</p>
      </div>
      <div className="max-w-full"></div>
      <div className="max-w-full"></div>
    </div>
  );
}
