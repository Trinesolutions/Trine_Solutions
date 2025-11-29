import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Settings, 
  Users, 
  Shield, 
  TrendingUp,
  Clock,
  DollarSign,
  Headphones,
  Monitor,
  BarChart3,
  Building2,
  Award,
  Zap,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Activity
} from 'lucide-react';
import SEO, { pageSEO } from '@/components/SEO';

const ManagedServices = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const serviceOfferings = [
    {
      icon: Monitor,
      title: "IT Staffing Management",
      description: "End-to-end management of your IT staffing needs including sourcing, onboarding, and performance management.",
      features: ["Talent Pipeline Management", "Performance Monitoring", "Skill Development", "Retention Programs"]
    },
    {
      icon: Users,
      title: "Workforce Management",
      description: "Comprehensive workforce solutions including scheduling, compliance, and productivity optimization.",
      features: ["Resource Planning", "Time & Attendance", "Workforce Analytics", "Compliance Management"]
    },
    {
      icon: Settings,
      title: "HR Functions",
      description: "Outsourced HR operations including payroll, benefits administration, and employee relations.",
      features: ["Payroll Processing", "Benefits Administration", "Employee Relations", "Policy Management"]
    },
    {
      icon: Headphones,
      title: "Support Services",
      description: "24/7 operational support including help desk, technical support, and issue resolution.",
      features: ["Help Desk Support", "Technical Support", "Issue Resolution", "Service Desk Operations"]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Cost Reduction",
      description: "Reduce operational costs by up to 40% through economies of scale and process efficiencies."
    },
    {
      icon: Award,
      title: "Expert Resources",
      description: "Access to specialized expertise and best practices without building internal capabilities."
    },
    {
      icon: TrendingUp,
      title: "Scalability",
      description: "Easily scale services up or down based on business needs and growth requirements."
    },
    {
      icon: Shield,
      title: "Compliance Assurance",
      description: "Stay compliant with industry regulations and labor laws through expert management."
    },
    {
      icon: Clock,
      title: "Focus on Core Business",
      description: "Free up internal resources to focus on strategic initiatives and core competencies."
    },
    {
      icon: BarChart3,
      title: "Performance Visibility",
      description: "Real-time dashboards and analytics for complete visibility into service performance."
    }
  ];

  const slaMetrics = [
    { metric: "Response Time", target: "< 15 mins", category: "Critical Issues" },
    { metric: "Resolution Time", target: "< 4 hours", category: "High Priority" },
    { metric: "Uptime Guarantee", target: "99.9%", category: "Availability" },
    { metric: "Customer Sat.", target: "> 95%", category: "Quality" }
  ];

  const industries = [
    {
      icon: Building2,
      name: "Technology",
      description: "IT operations, development support, and technical infrastructure management."
    },
    {
      icon: HeartPulse,
      name: "Healthcare",
      description: "Healthcare IT, medical staffing, and compliance management services."
    },
    {
      icon: Landmark,
      name: "Financial Services",
      description: "Risk management, compliance, and financial operations support."
    },
    {
      icon: ShoppingCart,
      name: "Retail & E-commerce",
      description: "Customer support, fulfillment operations, and seasonal staffing."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Assessment",
      description: "Comprehensive evaluation of your current operations, pain points, and objectives."
    },
    {
      step: "02",
      title: "Solution Design",
      description: "Custom service design aligned with your business needs and SLA requirements."
    },
    {
      step: "03",
      title: "Transition",
      description: "Structured transition plan ensuring seamless handover with minimal disruption."
    },
    {
      step: "04",
      title: "Operations",
      description: "Day-to-day service delivery with dedicated teams and continuous monitoring."
    },
    {
      step: "05",
      title: "Optimization",
      description: "Ongoing improvements based on analytics, feedback, and evolving needs."
    }
  ];

  return (
    <div
      className={`min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-opacity duration-700 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <SEO 
        {...pageSEO.managedServices}
        canonicalUrl="https://trinesolutions.com/consulting/managed-services"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Consulting Services', url: 'https://trinesolutions.com/consulting' },
          { name: 'Managed Services', url: 'https://trinesolutions.com/consulting/managed-services' }
        ]}
      />

      {/* Global background accents - Blue/Sky Theme */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-transparent dark:from-sky-500/20 dark:via-blue-500/10 blur-3xl" />
        <div className="absolute top-1/3 -left-20 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-blue-400/20 via-sky-400/10 to-transparent dark:from-blue-400/20 dark:via-sky-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-[999px] bg-gradient-to-t from-slate-100 via-slate-100 to-transparent dark:from-slate-900 dark:via-slate-900 blur-2xl" />
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:flex-row lg:items-center lg:px-6 xl:px-0">
          {/* Left: Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 text-xs font-medium text-sky-700 dark:text-sky-300 backdrop-blur-sm">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600">
                <Settings className="h-3.5 w-3.5 text-white" />
              </span>
              Operational Excellence
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Focus on your
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text pl-2 text-transparent">
                core business
              </span>
              <br />
              we handle the rest
            </h1>

            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg leading-relaxed">
              Comprehensive managed services that deliver operational efficiency, cost savings, and guaranteed performance levels.
            </p>

            {/* Key points */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-sky-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Guaranteed SLAs
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Performance you can count on.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Cost Optimization
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Reduce operational expenses by up to 40%.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center rounded-full bg-sky-600 dark:bg-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-700 dark:hover:bg-sky-400"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1">
                  <Activity className="mr-1.5 h-3.5 w-3.5 text-sky-500" />
                  99.9% Uptime Guarantee
                </span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-full">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-sky-500/30 via-blue-500/20 to-indigo-500/30 opacity-60 blur-3xl" />
              <img 
                src="/technology.svg" 
                alt="Managed Services Illustration" 
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
            <span className="font-medium text-slate-900 dark:text-slate-200">Managed Services</span>
          </nav>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <span className="h-1 w-1 rounded-full bg-sky-500" />
            <span>Comprehensive Service Management</span>
          </span>
        </div>
      </section>

      {/* Section: What are Managed Services */}
      <section className="relative py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Operational
                <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text pl-2 text-transparent">
                  Excellence
                </span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base leading-relaxed">
                Managed services is a comprehensive outsourcing model where we take full responsibility 
                for specific business functions or operations. Rather than simply providing staff, we 
                deliver complete operational outcomes with defined service levels and performance metrics.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base leading-relaxed">
                At Trine Solutions, our managed services combine expert talent, proven processes, 
                and advanced technology to deliver exceptional operational performance. We become 
                an extension of your team, committed to your success.
              </p>
              
              {/* SLA Metrics Mini-Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {slaMetrics.map((sla, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 p-4">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{sla.metric}</p>
                    <p className="text-xl font-bold text-sky-600 dark:text-sky-400">{sla.target}</p>
                    <span className="inline-block mt-2 rounded-full bg-sky-100 dark:bg-sky-900/30 px-2 py-0.5 text-[10px] text-sky-700 dark:text-sky-300">
                      {sla.category}
                    </span>
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
                <span className="inline-flex items-center rounded-full bg-sky-100 dark:bg-sky-900/30 px-2.5 py-1 text-[11px] text-sky-700 dark:text-sky-300">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Efficiency
                </span>
              </div>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-3.5 hover:border-sky-400/40 hover:bg-sky-50/30 dark:hover:border-sky-400/40 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 via-blue-500/20 to-indigo-500/20">
                      <benefit.icon className="h-4.5 w-4.5 text-sky-600 dark:text-sky-400" />
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

      {/* Service Offerings */}
      <section className="relative py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">
              OUR SERVICES
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Comprehensive
              <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text pl-2 text-transparent">
                Managed Solutions
              </span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Tailored solutions designed to meet your specific operational requirements.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceOfferings.map((service, index) => (
              <div key={index} className="group relative rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{service.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-sky-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Process */}
      <section className="relative py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Engagement
              <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text pl-2 text-transparent">
                Process
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-200 via-blue-200 to-indigo-200 dark:from-sky-900 dark:via-blue-900 dark:to-indigo-900 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5 relative z-10">
              {processSteps.map((step, index) => (
                <div key={index} className="group relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white dark:border-slate-950 bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-300 font-bold shadow-sm group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 p-4 w-full h-full hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/5">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Industries
              <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text pl-2 text-transparent">
                We Serve
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400">
                  <industry.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{industry.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{industry.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-3xl border border-sky-200 dark:border-sky-800 bg-gradient-to-br from-sky-50 dark:from-sky-900/20 via-white dark:via-slate-950 to-blue-50 dark:to-slate-950 px-6 py-8 text-center shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
              Ready to optimize your operations?
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Partner with Trine Solutions for world-class managed services. Let us handle the complexity while you focus on growth.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 dark:bg-sky-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-700 dark:hover:bg-sky-400"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/consulting/statement-of-work"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/20 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-sky-500 dark:hover:text-white"
              >
                Explore SOW Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagedServices;
