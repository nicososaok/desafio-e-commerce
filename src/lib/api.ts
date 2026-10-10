const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const { token: customToken, headers: customHeaders, ...restOptions } = options;

  // Obtener token guardado en localStorage si estamos en el cliente
  const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = customToken || savedToken;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// 1. Enviar código de autenticación al email
export async function sendCode(email: string) {
  return fetchAPI("/auth", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// 2. Obtener el token JWT con email y código
export async function auth(email: string, code: number | string) {
  const data = await fetchAPI("/auth/token", {
    method: "POST",
    body: JSON.stringify({ email, code: Number(code) }),
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

// Obtener lista de productos destacados / recientes
export async function getFeaturedProducts() {
  return fetchAPI("/products"); // O "/search?limit=10" según cómo responda tu backend
}

// Obtener detalle de un producto por su ID
export async function getProductById(itemId: string) {
  return fetchAPI(`/products/${itemId}`);
}

// Buscar productos por término (q)
export async function searchProducts(query: string) {
  return fetchAPI(`/search?q=${encodeURIComponent(query)}`);
}

// Obtener perfil del usuario autenticado
export async function getMe() {
  return fetchAPI("/me");
}

// Actualizar datos del usuario (Nombre, Dirección, Teléfono, etc.)
export async function updateMe(data: Record<string, any>) {
  return fetchAPI("/me", {
    method: "PATCH", // Cambiá a "PUT" si tu backend lo requiere
    body: JSON.stringify(data),
  });
}

// Crear orden de compra y obtener URL de checkout de Mercado Pago
export async function createOrder(itemId: string, additionalData: Record<string, any> = {}) {
  return fetchAPI(`/order?itemId=${itemId}`, {
    method: "POST",
    body: JSON.stringify(additionalData),
  });
}