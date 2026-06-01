import { useState } from "react";

interface Props {
  config: string[];
  onChange: (config: string[]) => void;
}

export default function SkillsSettings({ config, onChange }: Props) {
  const [input, setInput] = useState("");

  const add = () => {
    const tag = input.trim();
    if (tag && !config.includes(tag)) {
      onChange([...config, tag]);
      setInput("");
    }
  };

  const remove = (skill: string) => onChange(config.filter((s) => s !== skill));

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mb-4">🏷️ Skill Tags</h2>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a skill tag..."
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none"
        />
        <button onClick={add} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition">
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {config.map((skill) => (
          <span key={skill} className="tag-pill flex items-center gap-2 text-sm">
            {skill}
            <button onClick={() => remove(skill)} className="text-white/40 hover:text-red-400 text-xs">✕</button>
          </span>
        ))}
      </div>
    </div>
  );
}
