import { useState, useEffect } from "react";
import type { SiteConfig } from "../lib/types";
import { defaultConfig } from "../lib/types";
import { api } from "../lib/api";
import ProfileSidebar from "../components/ProfileSidebar";
import ServicesSection from "../components/ServicesSection";
import GitHubSection from "../components/GitHubSection";
import SkillsSection from "../components/SkillsSection";
import BokehBackground from "../components/BokehBackground";
import { Star, ExternalLink } from "lucide-react";

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getConfig()
      .then(setConfig)
      .catch(() => setConfig(defaultConfig))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-white/40 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BokehBackground />

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 p-6 lg:p-8 max-w-7xl mx-auto min-h-screen items-start lg:items-center">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-80 lg:sticky lg:top-8 flex-shrink-0 space-y-4">
          <ProfileSidebar profile={config.profile} socials={config.socials} />
          <SkillsSection skills={config.skills} />
        </aside>

        {/* Right Content */}
        <main className="flex-1 flex flex-col gap-5 w-full">
          {config.github.showContribution && (
            <GitHubSection username={config.github.username} />
          )}
          <ServicesSection services={config.services} />
          {config.github.showRepos && (
            <ProjectsSection username={config.github.username} count={config.github.repoCount} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8">
        <div className="inline-flex items-center gap-2 text-white/20 text-xs">
          <span>{config.site.footer}</span>
        </div>
      </footer>
    </div>
  );
}

function ProjectsSection({ username, count }: { username: string; count: number }) {
  const [repos, setRepos] = useState<{ name: string; description: string; html_url: string; stargazers_count: number; language: string }[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=${count}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch(() => {});
  }, [username, count]);

  if (repos.length === 0) return null;

  const langColors: Record<string, string> = {
    Java: "#b07219",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
  };

  return (
    <section className="glass p-6 animate-in delay-4">
      <h2 className="text-lg font-bold mb-5 flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-sm">📦</span>
        <span className="text-white/90">Projects</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-strong p-5 glass-card block"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-white/90 group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                {repo.name}
                <ExternalLink size={12} className="text-white/15 group-hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100" />
              </h3>
              <div className="flex items-center gap-1 text-amber-400/70 text-sm flex-shrink-0">
                <Star size={14} fill="currentColor" />
                <span>{repo.stargazers_count}</span>
              </div>
            </div>
            <p className="text-white/35 text-sm mt-2 leading-relaxed line-clamp-2">
              {repo.description || "No description"}
            </p>
            {repo.language && (
              <div className="flex items-center gap-1.5 mt-3">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: langColors[repo.language] || "#6b7280" }}
                />
                <span className="text-white/30 text-xs">{repo.language}</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
