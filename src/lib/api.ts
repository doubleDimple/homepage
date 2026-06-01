import type { SiteConfig } from "./types";

const API_BASE = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("admin_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getConfig: () => request<SiteConfig>("/config"),
  updateConfig: (config: SiteConfig) =>
    request<{ success: boolean }>("/config", {
      method: "PUT",
      body: JSON.stringify(config),
    }),
  login: (password: string) =>
    request<{ token: string }>("/auth", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
};
