export async function onRequestGet(context) {
  const data = await context.env.KV.get("site-config", { type: "json" });
  const config = data || getDefaultConfig();
  return new Response(JSON.stringify(config), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

export async function onRequestPut(context) {
  const auth = context.request.headers.get("Authorization");
  if (!auth || auth !== `Bearer ${context.env.ADMIN_PASSWORD}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const config = await context.request.json();
  await context.env.KV.put("site-config", JSON.stringify(config));
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function getDefaultConfig() {
  return {
    site: { title: "My HomePage", description: "Welcome to my personal page", footer: "© 2025 Made with ❤️", backgroundGradient: ["#667eea", "#764ba2"] },
    profile: { name: "doubleDimple", role: "Full Stack Developer", avatar: "", location: "China", greeting: "Welcome", tagline: "Code changes the world" },
    socials: [
      { id: "github", icon: "github", url: "https://github.com/doubleDimple", label: "GitHub" },
      { id: "telegram", icon: "send", url: "https://t.me/Hermes_Agent_dd_bot", label: "Telegram" },
    ],
    skills: ["Java", "Docker", "Linux", "Cloud", "OCI", "DevOps"],
    services: [{ id: "oci-start", icon: "cloud", title: "OCI-Start", description: "Oracle Cloud 实例管理系统", url: "https://github.com/doubleDimple/oci-start" }],
    projects: [{ id: "oci-start", repo: "doubleDimple/oci-start", description: "Oracle Cloud instance management system", url: "https://github.com/doubleDimple/oci-start" }],
    github: { username: "doubleDimple", showContribution: true, showRepos: true, repoCount: 6 },
  };
}
