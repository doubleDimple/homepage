import { useState, useEffect } from "react";
import type { SiteConfig } from "../lib/types";
import { defaultConfig } from "../lib/types";
import { api } from "../lib/api";
import AdminSidebar from "../components/admin/AdminSidebar";
import SiteSettings from "../components/admin/SiteSettings";
import ProfileSettings from "../components/admin/ProfileSettings";
import SocialsSettings from "../components/admin/SocialsSettings";
import SkillsSettings from "../components/admin/SkillsSettings";
import ServicesSettings from "../components/admin/ServicesSettings";
import ProjectsSettings from "../components/admin/ProjectsSettings";
import GitHubSettings from "../components/admin/GitHubSettings";
import LoginModal from "../components/admin/LoginModal";

type Tab = "site" | "profile" | "socials" | "skills" | "services" | "projects" | "github";

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<Tab>("site");
  const [authenticated, setAuthenticated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setAuthenticated(true);
      loadConfig();
    }
  }, []);

  const loadConfig = async () => {
    try {
      const cfg = await api.getConfig();
      setConfig(cfg);
    } catch {
      setConfig(defaultConfig);
    }
  };

  const handleLogin = async (password: string) => {
    try {
      const { token } = await api.login(password);
      localStorage.setItem("admin_token", token);
      setAuthenticated(true);
      await loadConfig();
    } catch (err) {
      throw err;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateConfig(config);
      setMessage({ type: "success", text: "Saved successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: `Save failed: ${err}` });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <LoginModal onLogin={handleLogin} />;
  }

  const updateConfig = (partial: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Top Bar */}
      <header className="glass-strong px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-slate-900/80">
        <h1 className="text-xl font-bold">⚙️ Admin Panel</h1>
        <div className="flex items-center gap-4">
          {message && (
            <span className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {message.text}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "💾 Save"}
          </button>
          <a href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
            🏠 View Site
          </a>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600/80 hover:bg-red-700 rounded-lg text-sm transition">
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <main className="flex-1 glass p-6 rounded-2xl">
          {activeTab === "site" && <SiteSettings config={config.site} onChange={(site) => updateConfig({ site })} />}
          {activeTab === "profile" && <ProfileSettings config={config.profile} onChange={(profile) => updateConfig({ profile })} />}
          {activeTab === "socials" && <SocialsSettings config={config.socials} onChange={(socials) => updateConfig({ socials })} />}
          {activeTab === "skills" && <SkillsSettings config={config.skills} onChange={(skills) => updateConfig({ skills })} />}
          {activeTab === "services" && <ServicesSettings config={config.services} onChange={(services) => updateConfig({ services })} />}
          {activeTab === "projects" && <ProjectsSettings config={config.projects} onChange={(projects) => updateConfig({ projects })} />}
          {activeTab === "github" && <GitHubSettings config={config.github} onChange={(github) => updateConfig({ github })} />}
        </main>
      </div>
    </div>
  );
}
