import { useState, useEffect } from "react";

interface Props {
  username: string;
}

export default function GitHubSection({ username }: Props) {
  const [stats, setStats] = useState<{ public_repos: number; followers: number } | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, [username]);

  // Generate a mock contribution grid (real one requires auth)
  const cells = Array.from({ length: 210 }, () => {
    const level = Math.random();
    if (level < 0.5) return 0;
    if (level < 0.7) return 1;
    if (level < 0.85) return 2;
    if (level < 0.95) return 3;
    return 4;
  });

  return (
    <section className="glass p-6 animate-in delay-2">
      <h2 className="text-lg font-bold mb-5 flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-sm">📊</span>
        <span className="text-white/90">GitHub Activity</span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-white/30 hover:text-indigo-300 transition-colors font-normal"
        >
          @{username} →
        </a>
      </h2>

      {/* Contribution Heatmap */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4 mb-4 overflow-x-auto">
        <div className="contrib-grid" style={{ minWidth: '600px' }}>
          {cells.map((level, i) => (
            <div key={i} className={`contrib-cell ${level > 0 ? `l${level}` : ''}`} />
          ))}
        </div>
        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3">
          <span className="text-[10px] text-white/20 mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className={`contrib-cell !w-3 !h-3 ${l > 0 ? `l${l}` : ''}`} />
          ))}
          <span className="text-[10px] text-white/20 ml-1">More</span>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Repos" value={stats.public_repos} />
          <StatCard label="Followers" value={stats.followers} />
          <StatCard label="Platform" value="GitHub" />
          <StatCard label="Status" value="Active" icon="🟢" />
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon?: string }) {
  return (
    <div className="glass-strong p-4 rounded-xl text-center">
      <div className="text-xl font-bold text-white/90">
        {icon && <span className="mr-1">{icon}</span>}
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}
