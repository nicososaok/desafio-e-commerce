// components/footer/index.tsx
import { FooterContainer } from "./styled";

export function Footer() {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} El mejor e-commerce. Todos los derechos reservados.</p>
      <div className="flex gap-4">
        <a href="#" className="hover:underline">Términos</a>
        <a href="#" className="hover:underline">Privacidad</a>
        <a href="#" className="hover:underline">Contacto</a>
      </div>
    </FooterContainer>
  );
}