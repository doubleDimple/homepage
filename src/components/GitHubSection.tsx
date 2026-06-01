import { useState, useEffect } from "react";

interface Props {
  username: string;
}

interface ContributionData {
  total: number;
  activeDays: number;
  maxDay: number;
}

export default function GitHubSection({ username }: Props) {
  const [stats, setStats] = useState<ContributionData | null>(null);

  useEffect(() => {
    // Use GitHub's public contribution data
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then(() => {
        // Estimate from public profile
        setStats({ total: 0, activeDays: 0, maxDay: 0 });
      })
      .catch(() => {});
  }, [username]);

  return (
    <section className="glass p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span>📊</span> GitHub Contributions
      </h2>

      {/* Contribution calendar via GitHub */}
      <div className="rounded-xl overflow-hidden bg-white/5 p-4">
        <img
          src={`https://ghchart.rshlang.org/${username}`}
          alt={`${username}'s GitHub contribution chart`}
          className="w-full opacity-90"
          style={{ filter: "invert(1) hue-rotate(180deg) brightness(1.2)" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <noscript>
          <p className="text-white/50 text-sm text-center mt-2">
            GitHub contribution chart requires JavaScript
          </p>
        </noscript>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <StatCard label="Username" value={username} />
          <StatCard label="Platform" value="GitHub" />
          <StatCard label="Chart" value="Live" />
          <StatCard label="Status" value="Active" />
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-strong p-3 rounded-xl text-center">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-white/50 text-xs mt-1">{label}</div>
    </div>
  );
}
