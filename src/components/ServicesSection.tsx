import type { ServiceCard } from "../lib/types";
import { Cloud, Globe, Code, Rocket, Server, Database, Shield, Terminal } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  cloud: Cloud,
  globe: Globe,
  code: Code,
  rocket: Rocket,
  server: Server,
  database: Database,
  shield: Shield,
  terminal: Terminal,
};

interface Props {
  services: ServiceCard[];
}

export default function ServicesSection({ services }: Props) {
  if (services.length === 0) return null;

  return (
    <section className="glass p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span>🌐</span> Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((s) => {
          const Icon = iconMap[s.icon] || Globe;
          return (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-strong p-5 glass-card block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/30 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-white/60 text-sm">{s.description}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
