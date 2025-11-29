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
  Zap
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
      activities: ["Requirements gathering", "Stakeholder alignment", "Deliverables specification", "Success criteria definition"],
      icon: ClipboardList
    },
    {
      phase: "Resource Planning",
      activities: ["Team composition", "Skill mapping", "Resource allocation", "Capacity planning"],
      icon: Users
    },
    {
      phase: "Project Execution",
      activities: ["Sprint planning", "Daily standups", "Progress tracking", "Risk management"],
      icon: Settings
    },
    {
      phase: "Quality Assurance",
      activities: ["Code reviews", "Testing protocols", "Performance validation", "Security audits"],
      icon: Shield
    },
    {
      phase: "Delivery & Handover",
      activities: ["Documentation", "Knowledge transfer", "User training", "Go-live support"],
      icon: Award
    }
  ];

  const stats = [
    { value: "150+", label: "SOW Projects Delivered" },
    { value: "98%", label: "On-Time Delivery" },
    { value: "100%", label: "Budget Compliance" },
    { value: "4.9/5", label: "Client Satisfaction" }
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
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <SEO 
        {...pageSEO.statementOfWork}
        canonicalUrl="https://trinesolutions.com/consulting/statement-of-work"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Consulting Services', url: 'https://trinesolutions.com/consulting' },
          { name: 'Statement of Work', url: 'https://trinesolutions.com/consulting/statement-of-work' }
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop"
            alt="Statement of Work - Project-Based Engagement"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-trine-black/90 via-trine-black/80 to-trine-orange/40"></div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-trine-orange to-trine-green rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-trine-lightblue to-trine-orange rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <FileText className="w-16 h-16 text-trine-orange mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green bg-clip-text text-transparent">
                Statement of Work
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-4 text-trine-orange font-semibold">
              Project-Based Excellence
            </p>
            <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
              Achieve your project goals with our SOW engagement model. Defined deliverables, 
              fixed timelines, and guaranteed outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-trine-orange to-trine-lightblue rounded-full font-semibold hover:shadow-lg hover:shadow-trine-orange/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Start a Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/services" className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-trine-orange transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Consulting Services</span>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-trine-orange font-medium">Statement of Work</span>
          </nav>
        </div>
      </section>

      {/* What is SOW */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                What is <span className="text-trine-orange">Statement of Work</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                A Statement of Work (SOW) is a project-based engagement model where we take 
                full responsibility for delivering specific outcomes within defined parameters. 
                Unlike traditional staffing, SOW engagements focus on results rather than 
                resource hours.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                At Trine Solutions, our SOW engagements combine expert talent, proven methodologies, 
                and robust project management to deliver exceptional outcomes. We handle the 
                complexity while you focus on your core business.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-trine-orange/10 to-trine-lightblue/10 dark:from-gray-800 dark:to-gray-700">
                    <div className="text-3xl font-bold text-trine-orange mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=600&h=400&fit=crop"
                  alt="Project planning session"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Results-Driven Delivery</h3>
                  <p className="text-white/90 text-sm">Fixed scope, fixed price, guaranteed outcomes</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center mb-2">
                  <BarChart3 className="w-8 h-8 text-trine-orange mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">On-Time Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-trine-orange/10 to-trine-lightblue/10 text-trine-orange font-semibold text-sm mb-4">
              <Target className="w-4 h-4 inline mr-2" />
              Key Advantages
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Benefits of <span className="bg-gradient-to-r from-trine-orange to-trine-lightblue bg-clip-text text-transparent">Statement of Work</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Why organizations choose Statement of Work for project delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-trine-orange/20 to-trine-lightblue/20 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trine-orange/20 to-trine-lightblue/10 flex items-center justify-center mb-6 group-hover:from-trine-orange group-hover:to-trine-lightblue group-hover:shadow-lg transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-trine-orange group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-trine-orange transition-colors">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of SOW Engagements */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Types of <span className="text-trine-green">SOW Engagements</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the engagement model that best fits your project needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {engagementTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trine-green to-trine-lightblue flex items-center justify-center mr-4">
                    <type.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{type.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example, idx) => (
                    <span key={idx} className="px-3 py-1 bg-trine-green/10 text-trine-green rounded-full text-sm font-medium">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Manage SOW Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              How We <span className="bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent">Manage Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our proven project management framework ensures successful delivery
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {managementProcess.map((phase, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg h-full">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-trine-orange rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trine-orange/20 to-trine-lightblue/20 flex items-center justify-center mx-auto mb-4 mt-2">
                    <phase.icon className="w-6 h-6 text-trine-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-4 text-gray-900 dark:text-white">{phase.phase}</h3>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-trine-green mr-2 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Success <span className="text-trine-lightblue">Metrics</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Measurable results from our SOW engagements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg h-full">
                  <div className="text-4xl font-bold bg-gradient-to-r from-trine-orange to-trine-lightblue bg-clip-text text-transparent mb-3">
                    {metric.value}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{metric.metric}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-trine-orange via-trine-lightblue to-trine-green">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Let our SOW experts help you define scope, plan delivery, and achieve 
              your project objectives with guaranteed outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Request a Proposal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/consulting/managed-services" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Explore Managed Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatementOfWork;
