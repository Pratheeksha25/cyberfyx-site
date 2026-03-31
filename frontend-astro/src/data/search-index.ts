export interface SearchEntry {
  title: string;
  url: string;
  excerpt: string;
  keywords: string[];
}

export const searchIndex: SearchEntry[] = [
  {
    title: "Cybersecurity",
    url: "/services/cybersecurity",
    excerpt: "Risk reduction, testing, privacy, and strategic leadership.",
    keywords: ["vapt", "red team", "soc", "vciso", "dpo"]
  },
  {
    title: "IT Security",
    url: "/services/it-security",
    excerpt: "Framework implementation, internal audits, continuity, and cloud governance.",
    keywords: ["iso 27001", "iso 27701", "iso 22301", "itsm", "audit"]
  },
  {
    title: "Endpoint Operations",
    url: "/services/endpoint-management",
    excerpt: "Visibility, automation, monitoring, and lifecycle control.",
    keywords: ["uem", "mdm", "siem", "monitoring", "noc"]
  },
  {
    title: "Core Industry Services",
    url: "/services/core-industry",
    excerpt: "Management systems, sector audits, and industrial assurance.",
    keywords: ["sedex", "fsc", "fire safety", "industrial"]
  },
  {
    title: "Training",
    url: "/services/training",
    excerpt: "Capability building for security, privacy, governance, and recovery teams.",
    keywords: ["gdpr", "hipaa", "pci dss", "itil", "cobit"]
  },
  {
    title: "Industries We Protect",
    url: "/industries",
    excerpt: "Tailored cybersecurity and IT governance frameworks.",
    keywords: ["healthcare", "bfsi", "manufacturing", "public sector", "enterprise"]
  },
  {
    title: "About Cyberfyx",
    url: "/about",
    excerpt: "A globally trusted leader in cybersecurity and smart IT management.",
    keywords: ["mission", "vision", "company"]
  },
  {
    title: "Contact Us",
    url: "/contact",
    excerpt: "Start a security conversation.",
    keywords: ["email", "phone", "location", "inquiry"]
  }
];
