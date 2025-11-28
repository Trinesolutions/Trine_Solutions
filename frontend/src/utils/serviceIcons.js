/**
 * Service Icons Utility
 * 
 * Provides a comprehensive, extensible icon system for services.
 * Icons are from Lucide React library and aligned with Trine Solutions branding.
 */

import {
  // Technology & Digital
  Zap,
  Cpu,
  Code2,
  Database,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  Server,
  HardDrive,
  Wifi,
  
  // Security & Protection
  Shield,
  ShieldCheck,
  Lock,
  Key,
  Eye,
  Fingerprint,
  
  // Cloud & Infrastructure
  Cloud,
  CloudCog,
  Network,
  
  // Analytics & Data
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Activity,
  
  // Business & Operations
  FileCheck,
  FileText,
  ClipboardCheck,
  Briefcase,
  Building2,
  Settings,
  
  // Tools & Development
  Wrench,
  Cog,
  Terminal,
  GitBranch,
  Layers,
  Box,
  
  // Innovation & Growth
  Lightbulb,
  Rocket,
  Target,
  Award,
  Sparkles,
  Star,
  
  // Communication & Users
  Users,
  UserCheck,
  MessageSquare,
  Headphones,
  Mail,
  
  // Workflow & Process
  RefreshCw,
  Workflow,
  ArrowRightLeft,
  CheckCircle2,
} from 'lucide-react';

/**
 * Icon Map - Maps icon names to Lucide React components
 * Used for dynamic icon rendering in services display
 */
export const iconMap = {
  // Technology & Digital
  Zap,
  Cpu,
  Code2,
  Database,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  Server,
  HardDrive,
  Wifi,
  
  // Security & Protection
  Shield,
  ShieldCheck,
  Lock,
  Key,
  Eye,
  Fingerprint,
  
  // Cloud & Infrastructure
  Cloud,
  CloudCog,
  Network,
  
  // Analytics & Data
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Activity,
  
  // Business & Operations
  FileCheck,
  FileText,
  ClipboardCheck,
  Briefcase,
  Building2,
  Settings,
  
  // Tools & Development
  Wrench,
  Cog,
  Terminal,
  GitBranch,
  Layers,
  Box,
  
  // Innovation & Growth
  Lightbulb,
  Rocket,
  Target,
  Award,
  Sparkles,
  Star,
  
  // Communication & Users
  Users,
  UserCheck,
  MessageSquare,
  Headphones,
  Mail,
  
  // Workflow & Process
  RefreshCw,
  Workflow,
  ArrowRightLeft,
  CheckCircle2,
};

/**
 * Icon Options - Array of icon options for admin panel
 * Grouped by category for better organization
 */
export const iconOptions = [
  // Most commonly used (shown first)
  { name: 'Zap', icon: Zap, category: 'Popular' },
  { name: 'Shield', icon: Shield, category: 'Popular' },
  { name: 'Cloud', icon: Cloud, category: 'Popular' },
  { name: 'BarChart3', icon: BarChart3, category: 'Popular' },
  { name: 'FileCheck', icon: FileCheck, category: 'Popular' },
  { name: 'Wrench', icon: Wrench, category: 'Popular' },
  
  // Technology & Digital
  { name: 'Cpu', icon: Cpu, category: 'Technology' },
  { name: 'Code2', icon: Code2, category: 'Technology' },
  { name: 'Database', icon: Database, category: 'Technology' },
  { name: 'Globe', icon: Globe, category: 'Technology' },
  { name: 'Laptop', icon: Laptop, category: 'Technology' },
  { name: 'Monitor', icon: Monitor, category: 'Technology' },
  { name: 'Smartphone', icon: Smartphone, category: 'Technology' },
  { name: 'Server', icon: Server, category: 'Technology' },
  { name: 'HardDrive', icon: HardDrive, category: 'Technology' },
  { name: 'Wifi', icon: Wifi, category: 'Technology' },
  
  // Security
  { name: 'ShieldCheck', icon: ShieldCheck, category: 'Security' },
  { name: 'Lock', icon: Lock, category: 'Security' },
  { name: 'Key', icon: Key, category: 'Security' },
  { name: 'Eye', icon: Eye, category: 'Security' },
  { name: 'Fingerprint', icon: Fingerprint, category: 'Security' },
  
  // Cloud & Infrastructure
  { name: 'CloudCog', icon: CloudCog, category: 'Cloud' },
  { name: 'Network', icon: Network, category: 'Cloud' },
  
  // Analytics
  { name: 'LineChart', icon: LineChart, category: 'Analytics' },
  { name: 'PieChart', icon: PieChart, category: 'Analytics' },
  { name: 'TrendingUp', icon: TrendingUp, category: 'Analytics' },
  { name: 'Activity', icon: Activity, category: 'Analytics' },
  
  // Business
  { name: 'FileText', icon: FileText, category: 'Business' },
  { name: 'ClipboardCheck', icon: ClipboardCheck, category: 'Business' },
  { name: 'Briefcase', icon: Briefcase, category: 'Business' },
  { name: 'Building2', icon: Building2, category: 'Business' },
  { name: 'Settings', icon: Settings, category: 'Business' },
  
  // Development
  { name: 'Cog', icon: Cog, category: 'Development' },
  { name: 'Terminal', icon: Terminal, category: 'Development' },
  { name: 'GitBranch', icon: GitBranch, category: 'Development' },
  { name: 'Layers', icon: Layers, category: 'Development' },
  { name: 'Box', icon: Box, category: 'Development' },
  
  // Innovation
  { name: 'Lightbulb', icon: Lightbulb, category: 'Innovation' },
  { name: 'Rocket', icon: Rocket, category: 'Innovation' },
  { name: 'Target', icon: Target, category: 'Innovation' },
  { name: 'Award', icon: Award, category: 'Innovation' },
  { name: 'Sparkles', icon: Sparkles, category: 'Innovation' },
  { name: 'Star', icon: Star, category: 'Innovation' },
  
  // Communication
  { name: 'Users', icon: Users, category: 'Communication' },
  { name: 'UserCheck', icon: UserCheck, category: 'Communication' },
  { name: 'MessageSquare', icon: MessageSquare, category: 'Communication' },
  { name: 'Headphones', icon: Headphones, category: 'Communication' },
  { name: 'Mail', icon: Mail, category: 'Communication' },
  
  // Workflow
  { name: 'RefreshCw', icon: RefreshCw, category: 'Workflow' },
  { name: 'Workflow', icon: Workflow, category: 'Workflow' },
  { name: 'ArrowRightLeft', icon: ArrowRightLeft, category: 'Workflow' },
  { name: 'CheckCircle2', icon: CheckCircle2, category: 'Workflow' },
];

/**
 * Get icon component by name
 * @param {string} iconName - Name of the icon
 * @returns {React.ComponentType<React.SVGProps<SVGSVGElement>>} - Lucide React icon component, defaults to Zap
 */
export const getIconByName = (iconName) => {
  return iconMap[iconName] || Zap;
};

/**
 * Get icon categories for filtering in admin panel
 * @returns {string[]} - Array of unique category names
 */
export const getIconCategories = () => {
  const categories = [...new Set(iconOptions.map(opt => opt.category))];
  return categories;
};

/**
 * Get icons by category
 * @param {string} category - Category name
 * @returns {Array} - Array of icon options in that category
 */
export const getIconsByCategory = (category) => {
  if (!category || category === 'All') {
    return iconOptions;
  }
  return iconOptions.filter(opt => opt.category === category);
};

export default iconMap;
