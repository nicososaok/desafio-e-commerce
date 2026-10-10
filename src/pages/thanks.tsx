// pages/thanks.tsx
import { useRouter } from "next/router";
import Link from "next/link";

export default function ThanksPage() {
  const router = useRouter();
  const { collection_status } = router.query;

  const isApproved = collection_status === "approved";

  return (
    <div style={{ maxWidth: "600px", margin: "60px auto", textAlign: "center", padding: "20px" }}>
      {isApproved ? (
        <>
          <h1 style={{ color: "#2e7d32" }}>¡Gracias por tu compra!</h1>
          <p>Tu pago fue procesado exitosamente. Te enviamos los detalles a tu email.</p>
        </>
      ) : (
        <>
          <h1 style={{ color: "#c62828" }}>Pago pendiente o no completado</h1>
          <p>Hubo un problema o tu pago aún está en proceso.</p>
        </>
      )}

      <div style={{ marginTop: "30px" }}>
        <Link href="/" style={{ textDecoration: "underline", fontWeight: "bold" }}>
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}