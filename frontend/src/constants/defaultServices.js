/**
 * Default Services Constants
 * 
 * Single source of truth for default services data.
 * Used as fallback when API is unavailable.
 * Aligned with Trine Solutions branding and service offerings.
 */

// Full services with capabilities and tools (for Services page)
export const defaultServices = [
  {
    id: "1",
    title: "Digital Transformation",
    description: "Transform your business with cutting-edge digital solutions that drive innovation and efficiency.",
    icon: "Zap",
    capabilities: ["Enterprise Architecture", "Process Automation", "Digital Strategy", "Change Management"],
    tools: ["Cloud Platforms", "AI/ML", "IoT", "Blockchain"]
  },
  {
    id: "2",
    title: "Cybersecurity",
    description: "Protect your enterprise with comprehensive security solutions and risk management strategies.",
    icon: "Shield",
    capabilities: ["Security Assessment", "Threat Intelligence", "Incident Response", "Compliance Management"],
    tools: ["SIEM", "Penetration Testing", "Security Operations Center", "Identity Management"]
  },
  {
    id: "3",
    title: "Cloud & DevOps",
    description: "Accelerate delivery with modern cloud infrastructure and DevOps best practices.",
    icon: "Cloud",
    capabilities: ["Cloud Migration", "Infrastructure as Code", "CI/CD Pipelines", "Container Orchestration"],
    tools: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"]
  },
  {
    id: "4",
    title: "Data Analytics & AI",
    description: "Unlock insights from your data with advanced analytics and artificial intelligence solutions.",
    icon: "BarChart3",
    capabilities: ["Data Warehousing", "Machine Learning", "Predictive Analytics", "Business Intelligence"],
    tools: ["Python", "TensorFlow", "Tableau", "Power BI", "Snowflake"]
  },
  {
    id: "5",
    title: "Risk & Compliance",
    description: "Navigate regulatory landscapes with expert risk management and compliance solutions.",
    icon: "FileCheck",
    capabilities: ["Regulatory Compliance", "Risk Assessment", "Audit Support", "Policy Development"],
    tools: ["GRC Platforms", "Audit Tools", "Compliance Management Systems"]
  },
  {
    id: "6",
    title: "Managed IT Services",
    description: "Focus on your business while we manage your IT infrastructure and support needs.",
    icon: "Wrench",
    capabilities: ["24/7 Support", "Infrastructure Management", "Service Desk", "Performance Monitoring"],
    tools: ["Monitoring Tools", "Service Management", "Remote Support", "Asset Management"]
  }
];

// Simplified services for Home page cards (maintains consistency)
export const getSimplifiedServices = (services = defaultServices) => {
  return services.map(service => ({
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon
  }));
};

export default defaultServices;
