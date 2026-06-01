import type { SiteInfo } from "../../lib/types";

interface Props {
  config: SiteInfo;
  onChange: (config: SiteInfo) => void;
}

export default function SiteSettings({ config, onChange }: Props) {
  const update = (key: keyof SiteInfo, value: string | [string, string]) =>
    onChange({ ...config, [key]: value });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mb-4">🏠 Site Settings</h2>
      <Field label="Site Title" value={config.title} onChange={(v) => update("title", v)} />
      <Field label="Description" value={config.description} onChange={(v) => update("description", v)} />
      <Field label="Footer Text" value={config.footer} onChange={(v) => update("footer", v)} />
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Gradient Start"
          value={config.backgroundGradient[0]}
          onChange={(v) => update("backgroundGradient", [v, config.backgroundGradient[1]])}
          type="color"
        />
        <Field
          label="Gradient End"
          value={config.backgroundGradient[1]}
          onChange={(v) => update("backgroundGradient", [config.backgroundGradient[0], v])}
          type="color"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
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
