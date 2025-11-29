import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Target, 
  DollarSign, 
  Clock,
  Briefcase,
  TrendingUp,
  Shield,
  ClipboardList,
  Users,
  Settings,
  BarChart3,
  Award,
  Layers,
  Zap,
  PieChart
} from 'lucide-react';
import SEO, { pageSEO } from '@/components/SEO';

const StatementOfWork = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const benefits = [
    {
      icon: Target,
      title: "Defined Deliverables",
      description: "Clear project scope with specific outcomes, milestones, and success criteria."
    },
    {
      icon: DollarSign,
      title: "Budget Control",
      description: "Fixed-price engagements that provide cost predictability and financial control."
    },
    {
      icon: Clock,
      title: "Timeline Management",
      description: "Structured timelines with milestone-based progress tracking and delivery dates."
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Transfer project execution risks to experienced specialists."
    },
    {
      icon: Zap,
      title: "Faster Execution",
      description: "Dedicated teams focused solely on delivering your project objectives."
    },
    {
      icon: Award,
      title: "Accountability",
      description: "Single point of accountability for project outcomes and deliverables."
    }
  ];

  const engagementTypes = [
    {
      title: "Project-Based SOW",
      description: "Complete project delivery from start to finish with defined scope and timeline.",
      examples: ["System Implementation", "Application Development", "Data Migration"],
      icon: Layers
    },
    {
      title: "Milestone-Based SOW",
      description: "Deliverables tied to specific milestones with payments upon completion.",
      examples: ["Phased Rollouts", "Module Development", "Testing Phases"],
      icon: Target
    },
    {
      title: "Outcome-Based SOW",
      description: "Performance-based contracts focused on achieving specific business outcomes.",
      examples: ["Process Optimization", "Cost Reduction", "Efficiency Gains"],
      icon: TrendingUp
    },
    {
      title: "Managed Services SOW",
      description: "Ongoing operational support with defined service levels and metrics.",
      examples: ["IT Operations", "Help Desk Support", "System Maintenance"],
      icon: Settings
    }
  ];

  const managementProcess = [
    {
      phase: "Scope Definition",
      activities: ["Requirements gathering", "Stakeholder alignment", "Deliverables specification"],
      icon: ClipboardList
    },
    {
      phase: "Resource Planning",
      activities: ["Team composition", "Skill mapping", "Resource allocation"],
      icon: Users
    },
    {
      phase: "Project Execution",
      activities: ["Sprint planning", "Daily standups", "Progress tracking"],
      icon: Settings
    },
    {
      phase: "Quality Assurance",
      activities: ["Code reviews", "Testing protocols", "Performance validation"],
      icon: Shield
    },
    {
      phase: "Delivery & Handover",
      activities: ["Documentation", "Knowledge transfer", "User training"],
      icon: Award
    }
  ];

  const successMetrics = [
    {
      metric: "Project Success Rate",
      value: "98%",
      description: "Projects delivered meeting all defined criteria"
    },
    {
      metric: "Average Cost Savings",
      value: "25%",
      description: "Compared to traditional staffing models"
    },
    {
      metric: "Quality Score",
      value: "4.9/5",
      description: "Average client quality rating"
    },
    {
      metric: "Repeat Engagement",
      value: "85%",
      description: "Clients return for additional SOW projects"
    }
  ];

  return (
    <div
      className={`min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-opacity duration-700 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <SEO 
        {...pageSEO.statementOfWork}
        canonicalUrl="https://trinesolutions.com/consulting/statement-of-work"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Consulting Services', url: 'https://trinesolutions.com/consulting' },
          { name: 'Statement of Work', url: 'https://trinesolutions.com/consulting/statement-of-work' }
        ]}
      />

      {/* Global background accents - Orange/Amber Theme */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent dark:from-orange-500/20 dark:via-amber-500/10 blur-3xl" />
        <div className="absolute top-1/3 -left-20 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-400/10 to-transparent dark:from-amber-400/20 dark:via-orange-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-[999px] bg-gradient-to-t from-slate-100 via-slate-100 to-transparent dark:from-slate-900 dark:via-slate-900 blur-2xl" />
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:flex-row lg:items-center lg:px-6 xl:px-0">
          {/* Left: Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 text-xs font-medium text-orange-700 dark:text-orange-300 backdrop-blur-sm">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600">
                <FileText className="h-3.5 w-3.5 text-white" />
              </span>
              Project-Based Excellence
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Defined scope
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text pl-2 text-transparent">
                guaranteed results
              </span>
              <br />
              on time, on budget
            </h1>

            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg leading-relaxed">
              Achieve your project goals with our SOW engagement model. Defined deliverables, fixed timelines, and guaranteed outcomes.
            </p>

            {/* Key points */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-orange-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Fixed Price
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cost predictability and control.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Risk Mitigation
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    We take responsibility for delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center rounded-full bg-orange-600 dark:bg-orange-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-700 dark:hover:bg-orange-400"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1">
                  <Award className="mr-1.5 h-3.5 w-3.5 text-orange-500" />
                  98% On-Time Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-full">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-orange-500/30 via-amber-500/20 to-yellow-500/30 opacity-60 blur-3xl" />
              <img 
                src="/satisfied-clients.svg" 
                alt="Statement of Work Illustration" 
                className="relative z-10 w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb bar */}
      <section className="border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-xs text-slate-600 dark:text-slate-400 lg:px-6 xl:px-0">
          <nav className="flex items-center gap-2">
            <Link to="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-100">Consulting Services</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="font-medium text-slate-900 dark:text-slate-200">Statement of Work</span>
          </nav>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <span className="h-1 w-1 rounded-full bg-orange-500" />
            <span>Project-Based Engagement</span>
          </span>
        </div>
      </section>

      {/* Section: What is SOW */}
      <section className="relative py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Results-Driven
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text pl-2 text-transparent">
                  Delivery
                </span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base leading-relaxed">
                A Statement of Work (SOW) is a project-based engagement model where we take 
                full responsibility for delivering specific outcomes within defined parameters. 
                Unlike traditional staffing, SOW engagements focus on results rather than 
                resource hours.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base leading-relaxed">
                At Trine Solutions, our SOW engagements combine expert talent, proven methodologies, 
                and robust project management to deliver exceptional outcomes. We handle the 
                complexity while you focus on your core business.
              </p>
              
              {/* Success Metrics Mini-Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {successMetrics.slice(0, 4).map((metric, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 p-4">
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{metric.value}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{metric.metric}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-5 rounded-3xl border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-slate-950/60 p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
                  KEY ADVANTAGES
                </p>
                <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-1 text-[11px] text-orange-700 dark:text-orange-300">
                  <Target className="mr-1 h-3 w-3" />
                  Precision
                </span>
              </div>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-3.5 hover:border-orange-400/40 hover:bg-orange-50/30 dark:hover:border-orange-400/40 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-yellow-500/20">
                      <benefit.icon className="h-4.5 w-4.5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{benefit.title}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Types */}
      <section className="relative py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
              ENGAGEMENT MODELS
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Flexible
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text pl-2 text-transparent">
                SOW Options
              </span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Choose the engagement model that best fits your project needs and business objectives.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {engagementTypes.map((type, index) => (
              <div key={index} className="group relative rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <type.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{type.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{type.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example, idx) => (
                    <span key={idx} className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Process */}
      <section className="relative py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Project
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text pl-2 text-transparent">
                Lifecycle
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200 dark:from-orange-900 dark:via-amber-900 dark:to-yellow-900 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5 relative z-10">
              {managementProcess.map((phase, index) => (
                <div key={index} className="group relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white dark:border-slate-950 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 font-bold shadow-sm group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 p-4 w-full h-full hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                    <div className="mb-3 flex justify-center">
                      <phase.icon className="h-6 w-6 text-orange-500 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{phase.phase}</h3>
                    <ul className="space-y-1">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-3xl border border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 dark:from-orange-900/20 via-white dark:via-slate-950 to-amber-50 dark:to-slate-950 px-6 py-8 text-center shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
              Ready to start your project?
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Let our SOW experts help you define scope, plan delivery, and achieve your project objectives with guaranteed outcomes.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-orange-600 dark:bg-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-700 dark:hover:bg-orange-400"
              >
                Request Proposal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/consulting/managed-services"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/20 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-orange-500 dark:hover:text-white"
              >
                Explore Managed Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatementOfWork;
