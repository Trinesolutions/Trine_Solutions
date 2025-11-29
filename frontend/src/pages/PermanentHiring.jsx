import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Heart, 
  TrendingUp, 
  Award,
  Target, 
  Search,
  UserCheck,
  FileCheck,
  Briefcase,
  Building2,
  Handshake,
  Star,
  Quote,
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import SEO, { pageSEO } from '@/components/SEO';

const PermanentHiring = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const benefits = [
    {
      icon: Heart,
      title: "Long-term Commitment",
      description: "Build dedicated teams invested in your company's success and growth over time.",
      tag: "Loyalty"
    },
    {
      icon: Users,
      title: "Cultural Fit",
      description: "We ensure candidates align with your organization's values, mission, and work culture.",
      tag: "Alignment"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Permanent roles attract top talent seeking stability and advancement opportunities.",
      tag: "Retention"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Rigorous vetting process ensures only the best candidates reach your team.",
      tag: "Excellence"
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Discovery & Consultation",
      description: "Deep dive into your organization's needs, culture, technical requirements, and growth plans.",
      icon: Target
    },
    {
      step: "02",
      title: "Strategic Sourcing",
      description: "Leverage our extensive network, databases, and advanced recruiting tools to identify top candidates.",
      icon: Search
    },
    {
      step: "03",
      title: "Comprehensive Assessment",
      description: "Multi-stage evaluation including technical assessments, behavioral interviews, and reference checks.",
      icon: UserCheck
    },
    {
      step: "04",
      title: "Candidate Presentation",
      description: "Present thoroughly vetted candidates with detailed profiles and assessment summaries.",
      icon: FileCheck
    },
    {
      step: "05",
      title: "Interview Coordination",
      description: "Manage the entire interview process, scheduling, feedback collection, and communication.",
      icon: Briefcase
    },
    {
      step: "06",
      title: "Offer & Onboarding Support",
      description: "Assist with offer negotiations and ensure smooth onboarding for new hires.",
      icon: Handshake
    }
  ];

  const specializations = [
    {
      category: "Technology",
      roles: ["Software Engineers", "DevOps Engineers", "Data Scientists", "Cloud Architects", "Security Engineers", "Product Managers"]
    },
    {
      category: "Finance",
      roles: ["Financial Analysts", "Controllers", "Risk Managers", "Compliance Officers", "Treasury Managers", "CFOs"]
    },
    {
      category: "Healthcare",
      roles: ["Healthcare Administrators", "Clinical Directors", "Medical Coders", "Healthcare IT Specialists", "Compliance Managers"]
    },
    {
      category: "Engineering",
      roles: ["Project Engineers", "Design Engineers", "Quality Engineers", "Manufacturing Engineers", "Process Engineers"]
    }
  ];

  const successStories = [
    {
      company: "TechStart Inc.",
      industry: "Technology",
      challenge: "Needed to build entire engineering team from scratch within 3 months",
      result: "Placed 15 engineers including 3 senior leads, achieving 100% retention after 1 year",
      metric: "15 Placements"
    },
    {
      company: "HealthFirst Systems",
      industry: "Healthcare",
      challenge: "Critical need for specialized healthcare IT professionals",
      result: "Filled 8 specialized roles in 6 weeks, reducing vendor dependency by 40%",
      metric: "6 Weeks"
    },
    {
      company: "Global Finance Corp",
      industry: "Finance",
      challenge: "Executive search for C-suite and senior leadership positions",
      result: "Successfully placed CFO and 4 VPs, transforming finance operations",
      metric: "5 Executives"
    }
  ];

  const stats = [
    { value: "2,000+", label: "Permanent Placements" },
    { value: "92%", label: "First-Year Retention" },
    { value: "30 Days", label: "Avg. Time to Fill" },
    { value: "98%", label: "Client Satisfaction" }
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      position: "VP of Engineering, TechStart Inc.",
      content: "Trine Solutions helped us build our dream engineering team. Their understanding of our culture and technical needs was exceptional.",
      rating: 5
    },
    {
      name: "Robert Chen",
      position: "CHRO, Global Finance Corp",
      content: "The quality of candidates Trine presented exceeded our expectations. They truly understand executive recruitment.",
      rating: 5
    }
  ];

  return (
    <div
      className={`min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-opacity duration-700 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <SEO 
        {...pageSEO.permanentHiring}
        canonicalUrl="https://trinesolutions.com/consulting/permanent-hiring"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Consulting Services', url: 'https://trinesolutions.com/consulting' },
          { name: 'Permanent Hiring', url: 'https://trinesolutions.com/consulting/permanent-hiring' }
        ]}
      />

      {/* Global background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-transparent dark:from-emerald-500/20 dark:via-green-500/10 blur-3xl" />
        <div className="absolute top-1/3 -left-20 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-green-400/20 via-emerald-400/10 to-transparent dark:from-green-400/20 dark:via-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-[999px] bg-gradient-to-t from-slate-100 via-slate-100 to-transparent dark:from-slate-900 dark:via-slate-900 blur-2xl" />
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:flex-row lg:items-center lg:px-6 xl:px-0">
          {/* Left: Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 backdrop-blur-sm">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600">
                <Briefcase className="h-3.5 w-3.5 text-white" />
              </span>
              Long-term Talent Acquisition
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Build your
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text pl-2 text-transparent">
                dream team
              </span>
              <br />
              with confidence
            </h1>

            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg leading-relaxed">
              Connect with exceptional professionals who align with your vision. Our permanent hiring solutions ensure you find talent that grows with your organization.
            </p>

            {/* Key points */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Cultural Alignment
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Candidates who fit your values and mission.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Long-term Retention
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Focus on career growth and stability.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:hover:bg-emerald-400"
              >
                Start Hiring
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1">
                  <Award className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                  92% First-Year Retention
                </span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-full">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-emerald-500/30 via-green-500/20 to-teal-500/30 opacity-60 blur-3xl" />
              <img 
                src="/career.svg" 
                alt="Permanent Hiring Illustration" 
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
            <span className="font-medium text-slate-900 dark:text-slate-200">Permanent Hiring</span>
          </nav>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            <span>Strategic Talent Acquisition</span>
          </span>
        </div>
      </section>

      {/* Section: What is Permanent Hiring */}
      <section className="relative py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Invest in your
                <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text pl-2 text-transparent">
                  long-term success
                </span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base leading-relaxed">
                Permanent hiring is more than just filling a vacancy; it's about adding a core member to your family. 
                It requires a deep understanding of not just technical skills, but also soft skills, aspirations, and cultural fit.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base leading-relaxed">
                At Trine Solutions, we act as your brand ambassadors in the talent market. We tell your story, 
                champion your vision, and attract professionals who are eager to contribute to your journey for the long haul.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                {stats.map((stat, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 p-4">
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stat.value}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-5 rounded-3xl border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-slate-950/60 p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
                  CORE ADVANTAGES
                </p>
                <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 text-[11px] text-emerald-700 dark:text-emerald-300">
                  <Heart className="mr-1 h-3 w-3" />
                  People First
                </span>
              </div>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-3.5 hover:border-emerald-400/40 hover:bg-emerald-50/30 dark:hover:border-emerald-400/40 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20">
                      <benefit.icon className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{benefit.title}</p>
                        <span className="rounded-full bg-slate-100 dark:bg-slate-900 px-2 py-0.5 text-[10px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                          {benefit.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Process */}
      <section className="relative py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
              OUR PROCESS
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Precision
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text pl-2 text-transparent">
                Recruitment Methodology
              </span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              A systematic approach designed to identify, evaluate, and secure the best talent for your specific needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {methodology.map((step, index) => (
              <div key={index} className="group relative rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="absolute top-6 right-6 text-4xl font-bold text-slate-100 dark:text-slate-800 group-hover:text-emerald-50 dark:group-hover:text-emerald-900/20 transition-colors">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="relative py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Specialized
                <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text pl-2 text-transparent">
                  Talent Pools
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                We maintain deep networks in key industries to ensure rapid access to qualified professionals.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {specializations.map((spec, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 p-6 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                    <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{spec.category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {spec.roles.map((role, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="relative py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/5">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 xl:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Proven
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text pl-2 text-transparent">
                Results
              </span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <div key={index} className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-950 p-6 shadow-lg border border-slate-100 dark:border-white/5">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Award className="h-24 w-24 text-emerald-500" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      {story.industry}
                    </span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{story.metric}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{story.company}</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider mb-1">Challenge</p>
                      <p className="text-slate-700 dark:text-slate-300">{story.challenge}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">Result</p>
                      <p className="text-slate-700 dark:text-slate-300">{story.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 lg:px-6 xl:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Client
              <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text pl-2 text-transparent">
                Testimonials
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 p-6">
                <Quote className="h-8 w-8 text-emerald-200 dark:text-emerald-900 mb-4" />
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 dark:from-emerald-900/20 via-white dark:via-slate-950 to-green-50 dark:to-slate-950 px-6 py-8 text-center shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
              Ready to build your dream team?
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Partner with Trine Solutions for your permanent hiring needs. Let us help you find exceptional talent that drives long-term success.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:hover:bg-emerald-400"
              >
                Start Hiring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/consulting/contingent-staffing"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-white/20 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500 dark:hover:text-white"
              >
                Explore Contingent Staffing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PermanentHiring;
