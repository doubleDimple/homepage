import type { ServiceCard } from "../lib/types";
import { Cloud, Globe, Code, Rocket, Server, Database, Shield, Terminal, ExternalLink } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  cloud: Cloud, globe: Globe, code: Code, rocket: Rocket,
  server: Server, database: Database, shield: Shield, terminal: Terminal,
};

interface Props {
  services: ServiceCard[];
}

export default function ServicesSection({ services }: Props) {
  if (services.length === 0) return null;

  return (
    <section className="glass p-6 animate-in delay-3">
      <h2 className="text-lg font-bold mb-5 flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-sm">🌐</span>
        <span className="text-white/90">Services</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s) => {
          const Icon = iconMap[s.icon] || Globe;
          return (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-strong p-5 glass-card flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all">
                <Icon size={20} className="text-indigo-300" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors flex items-center gap-1.5">
                  {s.title}
                  <ExternalLink size={12} className="text-white/20 group-hover:text-indigo-400 transition-colors" />
                </h3>
                <p className="text-white/40 text-sm mt-1 leading-relaxed">{s.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
