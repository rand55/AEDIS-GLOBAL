export async function GET() {
  try {
    const backend = process.env.AEDIS_BACKEND_URL;
    if (!backend) throw new Error("backend not configured");
    const response = await fetch(`${backend}/api/v1/health/ready`, { cache: "no-store" });
    if (!response.ok) throw new Error(`backend returned ${response.status}`);
    return Response.json({ status: "ready", frontend: "ok", backend: "ok" });
  } catch {
    return Response.json({ status: "starting" }, { status: 503 });
  }
}
