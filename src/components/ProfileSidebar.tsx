import type { ProfileInfo, SocialLink } from "../lib/types";
import { Send, Mail, Globe, MapPin, GitFork } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GitFork,
  send: Send,
  mail: Mail,
  globe: Globe,
};

interface Props {
  profile: ProfileInfo;
  socials: SocialLink[];
}

export default function ProfileSidebar({ profile, socials }: Props) {
  return (
    <div className="glass p-6 text-center">
      {/* Avatar */}
      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30 bg-white/10">
        {profile.avatar ? (
          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
        )}
      </div>

      {/* Name & Role */}
      <h1 className="text-2xl font-bold">{profile.greeting || profile.name}</h1>
      <p className="text-indigo-200 mt-1 font-medium">{profile.role}</p>
      <p className="text-white/60 text-sm mt-2 italic">"{profile.tagline}"</p>

      {/* Location */}
      {profile.location && (
        <p className="text-white/50 text-sm mt-2 flex items-center justify-center gap-1">
          <MapPin size={14} /> {profile.location}
        </p>
      )}

      {/* Social Links */}
      <div className="flex justify-center gap-3 mt-4">
        {socials.map((s) => {
          const Icon = iconMap[s.icon] || Globe;
          return (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center hover:bg-white/20 transition"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
