"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import type { ReactJsonViewProps, ThemeObject } from "react-json-view";

const ReactJsonEditor = dynamic<ReactJsonViewProps>(() => import("react-json-view"), {
  ssr: false,
  loading: () => (
    <div className="exchange-muted p-6 text-sm" role="status">
      Loading JSON editor…
    </div>
  ),
});

const lightTheme: ThemeObject = {
  base00: "#ffffff",
  base01: "#f7f8fa",
  base02: "#e5e7eb",
  base03: "#777d89",
  base04: "#667085",
  base05: "#18191d",
  base06: "#30333b",
  base07: "#000000",
  base08: "#b4233c",
  base09: "#9a6500",
  base0A: "#9a6500",
  base0B: "#147d54",
  base0C: "#087e8b",
  base0D: "#30333b",
  base0E: "#6d45a0",
  base0F: "#a2305f",
};
const darkTheme: ThemeObject = {
  base00: "#18191e",
  base01: "#23252b",
  base02: "#2b2d34",
  base03: "#858b98",
  base04: "#a6aab3",
  base05: "#e5e7eb",
  base06: "#f3f4f6",
  base07: "#ffffff",
  base08: "#f15b6c",
  base09: "#ffbb33",
  base0A: "#f7a600",
  base0B: "#7dd3a8",
  base0C: "#67c8cf",
  base0D: "#c2c7d0",
  base0E: "#c4b5fd",
  base0F: "#fda4af",
};

export const JsonEditor = ({ style, ...props }: Omit<ReactJsonViewProps, "theme">) => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="json-editor exchange-panel overflow-hidden">
      <ReactJsonEditor
        {...props}
        theme={resolvedTheme === "dark" ? darkTheme : lightTheme}
        style={{
          padding: "1.5rem",
          overflowX: "auto",
          fontSize: "12px",
          lineHeight: 1.8,
          backgroundColor: "var(--color-base-100)",
          color: "var(--color-base-content)",
          ...style,
        }}
      />
    </div>
  );
};
