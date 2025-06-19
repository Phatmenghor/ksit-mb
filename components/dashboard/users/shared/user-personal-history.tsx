import { Fragment } from "react";

// components/shared/InfoGrid.tsx
interface InfoGridProps {
  data: { label: string; value: string | number | undefined | null }[];
  columns?: number; // Optional: default to 2 columns
}

export default function InfoGrid({ data, columns = 2 }: InfoGridProps) {
  return (
    <div
      className={`grid grid-cols-${columns * 2} gap-x-4 gap-y-3 text-sm mt-4`}
    >
      {data.map((item, index) => (
        <Fragment key={index}>
          <div className="text-muted-foreground">{item.label}</div>
          <div>{item.value || ""}</div>
        </Fragment>
      ))}
    </div>
  );
}
