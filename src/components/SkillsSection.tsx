interface Props {
  skills: string[];
}

export default function SkillsSection({ skills }: Props) {
  if (skills.length === 0) return null;
  return (
    <div className="glass p-4 mt-4">
      <h3 className="text-sm font-semibold mb-3 text-white/70">🏷️ Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="tag-pill text-xs">{skill}</span>
        ))}
      </div>
    </div>
  );
}
