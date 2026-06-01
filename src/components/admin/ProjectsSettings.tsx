import type { ProjectCard } from "../../lib/types";

interface Props {
  config: ProjectCard[];
  onChange: (config: ProjectCard[]) => void;
}

export default function ProjectsSettings({ config, onChange }: Props) {
  const add = () => {
    const id = Date.now().toString();
    onChange([...config, { id, repo: "", description: "", url: "" }]);
  };

  const remove = (id: string) => onChange(config.filter((p) => p.id !== id));

  const update = (id: string, key: keyof ProjectCard, value: string) =>
    onChange(config.map((p) => (p.id === id ? { ...p, [key]: value } : p)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">📦 Projects</h2>
        <button onClick={add} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition">
          + Add
        </button>
      </div>
      {config.map((p) => (
        <div key={p.id} className="glass-strong p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">Project</span>
            <button onClick={() => remove(p.id)} className="text-red-400 hover:text-red-300 text-sm">✕ Remove</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input value={p.repo} onChange={(e) => update(p.id, "repo", e.target.value)} placeholder="owner/repo" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none" />
            <input value={p.description} onChange={(e) => update(p.id, "description", e.target.value)} placeholder="Description" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none" />
            <input value={p.url} onChange={(e) => update(p.id, "url", e.target.value)} placeholder="URL" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
