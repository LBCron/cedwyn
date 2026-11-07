export function corsHeaders(request) {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  try {
    const parsed = new URL(origin);
    const host = parsed.hostname.toLowerCase();
    if (parsed.protocol !== "https:" || !(host === "bucklerfamily.estate" || host.endsWith(".bucklerfamily.estate"))) return null;
    return {
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "Authorization, Content-Type",
      "access-control-max-age": "600",
      "vary": "Origin"
    };
  } catch {
    return null;
  }
}
