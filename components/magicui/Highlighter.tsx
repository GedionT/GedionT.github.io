import React from "react";

interface HighlighterProps {
  children: React.ReactNode;
  color?: string;
  action?: "underline" | "highlight";
}

export const Highlighter: React.FC<HighlighterProps> = ({
  children,
  color = "#3b82f6",
  action = "highlight",
}) => {
  if (action === "underline") {
    return (
      <span className="relative inline-block">
        {children}
        <span
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{ backgroundColor: color }}
        />
      </span>
    );
  }

  return (
    <span
      className="rounded-md px-1.5 py-0.5"
      style={{ backgroundColor: `${color}33`, color: color }}
    >
      {children}
    </span>
  );
};
