import type { ProfileInfo, SocialLink } from "../lib/types";
import { Send, Mail, Globe, MapPin, GitFork } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GitFork, send: Send, mail: Mail, globe: Globe,
};

interface Props {
  profile: ProfileInfo;
  socials: SocialLink[];
}

export default function ProfileSidebar({ profile, socials }: Props) {
  return (
    <div className="glass p-8 text-center animate-in">
      {/* Avatar with glow */}
      <div className="relative w-28 h-28 mx-auto mb-5">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-lg opacity-40 animate-pulse" />
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-indigo-600/30 to-purple-600/30">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              <span className="drop-shadow-lg">👨‍💻</span>
            </div>
          )}
        </div>
      </div>

      {/* Name & Role */}
      <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
        {profile.greeting || profile.name}
      </h1>
      <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/25">
        <span className="text-indigo-300 text-sm font-medium">{profile.role}</span>
      </div>

      {/* Tagline */}
      <p className="text-white/40 text-sm mt-4 italic leading-relaxed">
        "{profile.tagline}"
      </p>

      {/* Location */}
      {profile.location && (
        <p className="text-white/30 text-xs mt-3 flex items-center justify-center gap-1.5">
          <MapPin size={12} /> {profile.location}
        </p>
      )}

      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Social Links */}
      <div className="flex justify-center gap-3">
        {socials.map((s) => {
          const Icon = iconMap[s.icon] || Globe;
          return (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="group w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300"
            >
              <Icon size={18} className="text-white/50 group-hover:text-indigo-300 transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
