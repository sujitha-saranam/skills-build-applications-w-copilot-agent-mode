export function getApiBase() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME as string | undefined;
  const port = 8000;
  if (codespace) {
    return `https://${codespace}-${port}.app.github.dev/api`;
  }
  // safe localhost fallback
  return `http://localhost:${port}/api`;
}

export async function fetchJson(endpoint: string) {
  const url = endpoint.startsWith('http') ? endpoint : `${getApiBase()}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function normalizeListResponse(payload: any) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  // some APIs return { results: [...] }
  if (payload && Array.isArray(payload.results)) return payload.results;
  // otherwise, try to coerce
  return [];
}
