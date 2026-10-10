import { Title } from "@/components/ui/texts";
export function Card({ title = "Titulo", color = "var(--fucsia)" }: any) {
  return (
    <div style={{ border: "solid", borderRadius: "var(--border-radius)" }}>
      <Title>{title}</Title>
      <div style={{ backgroundColor: color }}>Hola</div>
    </div>
  );
}