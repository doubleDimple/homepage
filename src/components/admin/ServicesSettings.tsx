import type { ServiceCard } from "../../lib/types";

interface Props {
  config: ServiceCard[];
  onChange: (config: ServiceCard[]) => void;
}

export default function ServicesSettings({ config, onChange }: Props) {
  const add = () => {
    const id = Date.now().toString();
    onChange([...config, { id, icon: "globe", title: "New Service", description: "", url: "" }]);
  };

  const remove = (id: string) => onChange(config.filter((s) => s.id !== id));

  const update = (id: string, key: keyof ServiceCard, value: string) =>
    onChange(config.map((s) => (s.id === id ? { ...s, [key]: value } : s)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">🌐 Services</h2>
        <button onClick={add} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition">
          + Add
        </button>
      </div>
      {config.map((s) => (
        <div key={s.id} className="glass-strong p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">Service</span>
            <button onClick={() => remove(s.id)} className="text-red-400 hover:text-red-300 text-sm">✕ Remove</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={s.title} onChange={(e) => update(s.id, "title", e.target.value)} placeholder="Title" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none" />
            <input value={s.icon} onChange={(e) => update(s.id, "icon", e.target.value)} placeholder="Icon (cloud/globe/code/rocket/server/database/shield/terminal)" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none" />
            <input value={s.description} onChange={(e) => update(s.id, "description", e.target.value)} placeholder="Description" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none" />
            <input value={s.url} onChange={(e) => update(s.id, "url", e.target.value)} placeholder="URL" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
