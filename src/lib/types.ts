export interface SiteConfig {
  site: SiteInfo;
  profile: ProfileInfo;
  socials: SocialLink[];
  skills: string[];
  services: ServiceCard[];
  projects: ProjectCard[];
  github: GitHubConfig;
}

export interface SiteInfo {
  title: string;
  description: string;
  footer: string;
  backgroundGradient: [string, string];
}

export interface ProfileInfo {
  name: string;
  role: string;
  avatar: string;
  location: string;
  greeting: string;
  tagline: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  url: string;
  label: string;
}

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  url: string;
}

export interface ProjectCard {
  id: string;
  repo: string;
  description: string;
  url: string;
}

export interface GitHubConfig {
  username: string;
  showContribution: boolean;
  showRepos: boolean;
  repoCount: number;
}

export const defaultConfig: SiteConfig = {
  site: {
    title: "My HomePage",
    description: "Welcome to my personal page",
    footer: "© 2025 Made with ❤️",
    backgroundGradient: ["#667eea", "#764ba2"],
  },
  profile: {
    name: "doubleDimple",
    role: "Full Stack Developer",
    avatar: "",
    location: "China",
    greeting: "Welcome",
    tagline: "Code changes the world",
  },
  socials: [
    { id: "github", icon: "github", url: "https://github.com/doubleDimple", label: "GitHub" },
    { id: "telegram", icon: "send", url: "https://t.me/Hermes_Agent_dd_bot", label: "Telegram" },
  ],
  skills: ["Java", "Docker", "Linux", "Cloud", "OCI", "DevOps"],
  services: [
    {
      id: "oci-start",
      icon: "cloud",
      title: "OCI-Start",
      description: "Oracle Cloud 实例管理系统",
      url: "https://github.com/doubleDimple/oci-start",
    },
  ],
  projects: [
    {
      id: "oci-start",
      repo: "doubleDimple/oci-start",
      description: "Oracle Cloud instance management system",
      url: "https://github.com/doubleDimple/oci-start",
    },
  ],
  github: {
    username: "doubleDimple",
    showContribution: true,
    showRepos: true,
    repoCount: 6,
  },
};
