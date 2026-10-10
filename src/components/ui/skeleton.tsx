// components/ui/skeleton.tsx
export function Skeleton({ width = "100%", height = "20px", borderRadius = "4px" }: { width?: string; height?: string; borderRadius?: string; }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#e0e0e0",
        animation: "pulse 1.5s infinite ease-in-out",
      }}
    />
  );
}