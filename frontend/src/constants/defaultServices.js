/**
 * Default Services Constants
 * 
 * Single source of truth for default services data.
 * Used as fallback when API is unavailable.
 * Aligned with Trine Solutions branding and service offerings.
 */

// Default images for services (used as fallback)
export const defaultServiceImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
];

// Get a default image by index (cycles through available images)
export const getDefaultServiceImage = (index = 0) => {
  return defaultServiceImages[index % defaultServiceImages.length];
};

// Full services with capabilities and tools (for Services page)
export const defaultServices = [
  {
    id: "1",
    title: "Digital Transformation",
    description: "Transform your business with cutting-edge digital solutions that drive innovation and efficiency.",
    icon: "Zap",
    capabilities: ["Enterprise Architecture", "Process Automation", "Digital Strategy", "Change Management"],
    tools: ["Cloud Platforms", "AI/ML", "IoT", "Blockchain"],
    image: defaultServiceImages[0],
    fullDescription: "Our Digital Transformation services help organizations reimagine their business processes and customer experiences through innovative technology solutions. We guide you through every step of your digital journey, from strategy development to implementation and optimization, ensuring sustainable growth and competitive advantage in the digital age."
  },
  {
    id: "2",
    title: "Cybersecurity",
    description: "Protect your enterprise with comprehensive security solutions and risk management strategies.",
    icon: "Shield",
    capabilities: ["Security Assessment", "Threat Intelligence", "Incident Response", "Compliance Management"],
    tools: ["SIEM", "Penetration Testing", "Security Operations Center", "Identity Management"],
    image: defaultServiceImages[1],
    fullDescription: "In today's threat landscape, cybersecurity is not optional—it's essential. Our comprehensive security solutions protect your enterprise from evolving cyber threats while ensuring compliance with industry regulations. From vulnerability assessments to 24/7 monitoring, we provide end-to-end security services that safeguard your digital assets and reputation."
  },
  {
    id: "3",
    title: "Cloud & DevOps",
    description: "Accelerate delivery with modern cloud infrastructure and DevOps best practices.",
    icon: "Cloud",
    capabilities: ["Cloud Migration", "Infrastructure as Code", "CI/CD Pipelines", "Container Orchestration"],
    tools: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"],
    image: defaultServiceImages[2],
    fullDescription: "Embrace the power of cloud computing and modern DevOps practices to accelerate your software delivery and operational efficiency. Our experts help you design, migrate, and optimize cloud infrastructure while implementing CI/CD pipelines and container orchestration for faster, more reliable deployments."
  },
  {
    id: "4",
    title: "Data Analytics & AI",
    description: "Unlock insights from your data with advanced analytics and artificial intelligence solutions.",
    icon: "BarChart3",
    capabilities: ["Data Warehousing", "Machine Learning", "Predictive Analytics", "Business Intelligence"],
    tools: ["Python", "TensorFlow", "Tableau", "Power BI", "Snowflake"],
    image: defaultServiceImages[3],
    fullDescription: "Transform raw data into actionable insights with our advanced analytics and AI solutions. We help organizations build data-driven cultures by implementing modern data architectures, machine learning models, and business intelligence tools that enable smarter, faster decision-making across all levels of your organization."
  },
  {
    id: "5",
    title: "Risk & Compliance",
    description: "Navigate regulatory landscapes with expert risk management and compliance solutions.",
    icon: "FileCheck",
    capabilities: ["Regulatory Compliance", "Risk Assessment", "Audit Support", "Policy Development"],
    tools: ["GRC Platforms", "Audit Tools", "Compliance Management Systems"],
    image: defaultServiceImages[4],
    fullDescription: "Stay ahead of regulatory requirements and manage enterprise risk effectively with our comprehensive GRC solutions. We help organizations develop robust compliance frameworks, conduct risk assessments, and implement policies that protect your business while enabling growth in complex regulatory environments."
  },
  {
    id: "6",
    title: "Managed IT Services",
    description: "Focus on your business while we manage your IT infrastructure and support needs.",
    icon: "Wrench",
    capabilities: ["24/7 Support", "Infrastructure Management", "Service Desk", "Performance Monitoring"],
    tools: ["Monitoring Tools", "Service Management", "Remote Support", "Asset Management"],
    image: defaultServiceImages[5],
    fullDescription: "Let our experienced team manage your IT infrastructure so you can focus on what matters most—growing your business. Our managed services include 24/7 monitoring and support, proactive maintenance, and strategic IT planning to ensure your technology investments deliver maximum value and reliability."
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
