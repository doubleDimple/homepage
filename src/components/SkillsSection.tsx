interface Props {
  skills: string[];
}

export default function SkillsSection({ skills }: Props) {
  if (skills.length === 0) return null;
  return (
    <div className="glass p-5 mt-4 animate-in delay-1">
      <h3 className="text-xs font-semibold mb-3 text-white/30 uppercase tracking-widest">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="skill-pill">{skill}</span>
        ))}
      </div>
    </div>
  );
}
