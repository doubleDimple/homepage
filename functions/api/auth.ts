import type { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  ADMIN_PASSWORD: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json() as { password?: string };

  if (!body.password || body.password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Simple token = password itself (validated server-side on each request)
  return new Response(JSON.stringify({ token: env.ADMIN_PASSWORD }), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
