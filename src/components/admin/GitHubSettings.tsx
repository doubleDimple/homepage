import type { GitHubConfig } from "../../lib/types";

interface Props {
  config: GitHubConfig;
  onChange: (config: GitHubConfig) => void;
}

export default function GitHubSettings({ config, onChange }: Props) {
  const update = (key: keyof GitHubConfig, value: string | number | boolean) =>
    onChange({ ...config, [key]: value });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mb-4">📊 GitHub Settings</h2>
      <Field label="GitHub Username" value={config.username} onChange={(v) => update("username", v)} />
      <Field label="Repo Count" value={config.repoCount.toString()} onChange={(v) => update("repoCount", parseInt(v) || 0)} type="number" />
      <div className="flex items-center gap-3 mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={config.showContribution} onChange={(e) => update("showContribution", e.target.checked)} className="accent-indigo-600" />
          <span className="text-sm">Show Contribution Chart</span>
        </label>
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={config.showRepos} onChange={(e) => update("showRepos", e.target.checked)} className="accent-indigo-600" />
          <span className="text-sm">Show Repositories</span>
        </label>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:border-indigo-500 transition text-sm"
      />
    </div>
  );
}
