type Tab = "site" | "profile" | "socials" | "skills" | "services" | "projects" | "github";

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: "site", icon: "🏠", label: "Site" },
  { id: "profile", icon: "👤", label: "Profile" },
  { id: "socials", icon: "🔗", label: "Socials" },
  { id: "skills", icon: "🏷️", label: "Skills" },
  { id: "services", icon: "🌐", label: "Services" },
  { id: "projects", icon: "📦", label: "Projects" },
  { id: "github", icon: "📊", label: "GitHub" },
];

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: Props) {
  return (
    <aside className="w-full lg:w-48 flex lg:flex-col gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition text-left w-full ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </aside>
  );
}
