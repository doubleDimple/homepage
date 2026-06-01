import type { ProfileInfo } from "../../lib/types";

interface Props {
  config: ProfileInfo;
  onChange: (config: ProfileInfo) => void;
}

export default function ProfileSettings({ config, onChange }: Props) {
  const update = (key: keyof ProfileInfo, value: string) =>
    onChange({ ...config, [key]: value });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mb-4">👤 Profile Settings</h2>
      <Field label="Display Name" value={config.name} onChange={(v) => update("name", v)} />
      <Field label="Role / Title" value={config.role} onChange={(v) => update("role", v)} />
      <Field label="Avatar URL" value={config.avatar} onChange={(v) => update("avatar", v)} placeholder="https://..." />
      <Field label="Location" value={config.location} onChange={(v) => update("location", v)} />
      <Field label="Greeting" value={config.greeting} onChange={(v) => update("greeting", v)} />
      <Field label="Tagline" value={config.tagline} onChange={(v) => update("tagline", v)} />
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:border-indigo-500 transition text-sm"
      />
    </div>
  );
}
