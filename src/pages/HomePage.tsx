import { useState, useEffect } from "react";
import type { SiteConfig } from "../lib/types";
import { defaultConfig } from "../lib/types";
import { api } from "../lib/api";
import ProfileSidebar from "../components/ProfileSidebar";
import ServicesSection from "../components/ServicesSection";
import GitHubSection from "../components/GitHubSection";
import SkillsSection from "../components/SkillsSection";
import BokehBackground from "../components/BokehBackground";

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
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BokehBackground />

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto min-h-screen items-start lg:items-center">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-80 lg:sticky lg:top-6 flex-shrink-0">
          <ProfileSidebar profile={config.profile} socials={config.socials} />
          <SkillsSection skills={config.skills} />
        </aside>

        {/* Right Content */}
        <main className="flex-1 flex flex-col gap-6 w-full">
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
      <footer className="relative z-10 text-center py-6 text-white/60 text-sm">
        {config.site.footer}
      </footer>
    </div>
  );
}

function ProjectsSection({ username, count }: { username: string; count: number }) {
  const [repos, setRepos] = useState<{ name: string; description: string; html_url: string; stargazers_count: number }[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=${count}`)
      .then((r) => r.json())
      .then(setRepos)
      .catch(() => {});
  }, [username, count]);

  if (repos.length === 0) return null;

  return (
    <section className="glass p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span>📦</span> Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-strong p-4 glass-card block"
          >
            <h3 className="font-semibold text-lg">{repo.name}</h3>
            <p className="text-white/70 text-sm mt-1 line-clamp-2">{repo.description || "No description"}</p>
            <div className="mt-2 text-yellow-300 text-sm">⭐ {repo.stargazers_count}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
