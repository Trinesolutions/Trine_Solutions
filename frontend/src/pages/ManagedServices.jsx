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
  Server,
  FileCheck,
  BarChart3,
  Building2,
  Award,
  Zap,
  HeartPulse,
  Landmark,
  ShoppingCart
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
    { metric: "Response Time", target: "< 15 minutes", category: "Critical Issues" },
    { metric: "Resolution Time", target: "< 4 hours", category: "High Priority" },
    { metric: "Uptime Guarantee", target: "99.9%", category: "Service Availability" },
    { metric: "Customer Satisfaction", target: "> 95%", category: "Quality Metric" },
    { metric: "First Call Resolution", target: "> 80%", category: "Efficiency Metric" },
    { metric: "Escalation Rate", target: "< 5%", category: "Quality Metric" }
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

  const stats = [
    { value: "200+", label: "Managed Service Clients" },
    { value: "40%", label: "Average Cost Savings" },
    { value: "99.9%", label: "Service Uptime" },
    { value: "24/7", label: "Support Coverage" }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Assessment",
      description: "Comprehensive evaluation of your current operations, pain points, and objectives."
    },
    {
      step: "2",
      title: "Solution Design",
      description: "Custom service design aligned with your business needs and SLA requirements."
    },
    {
      step: "3",
      title: "Transition",
      description: "Structured transition plan ensuring seamless handover with minimal disruption."
    },
    {
      step: "4",
      title: "Operations",
      description: "Day-to-day service delivery with dedicated teams and continuous monitoring."
    },
    {
      step: "5",
      title: "Optimization",
      description: "Ongoing improvements based on analytics, feedback, and evolving needs."
    }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <SEO 
        {...pageSEO.managedServices}
        canonicalUrl="https://trinesolutions.com/consulting/managed-services"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Consulting Services', url: 'https://trinesolutions.com/consulting' },
          { name: 'Managed Services', url: 'https://trinesolutions.com/consulting/managed-services' }
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=1200&h=800&fit=crop"
            alt="Managed Services - Comprehensive Service Management"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-trine-black/90 via-trine-black/80 to-trine-green/40"></div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-trine-green to-trine-orange rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-trine-lightblue to-trine-green rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Settings className="w-16 h-16 text-trine-green mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-trine-green via-trine-lightblue to-trine-orange bg-clip-text text-transparent">
                Managed Services
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-4 text-trine-green font-semibold">
              Comprehensive Service Management
            </p>
            <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
              Focus on your core business while we handle the complexity. Our managed services 
              deliver operational excellence with guaranteed service levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-trine-green to-trine-lightblue rounded-full font-semibold hover:shadow-lg hover:shadow-trine-green/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Get Started
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
            <span className="text-trine-green font-medium">Managed Services</span>
          </nav>
        </div>
      </section>

      {/* What are Managed Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                What are <span className="text-trine-green">Managed Services</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Managed services is a comprehensive outsourcing model where we take full responsibility 
                for specific business functions or operations. Rather than simply providing staff, we 
                deliver complete operational outcomes with defined service levels and performance metrics.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                At Trine Solutions, our managed services combine expert talent, proven processes, 
                and advanced technology to deliver exceptional operational performance. We become 
                an extension of your team, committed to your success.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-trine-green/10 to-trine-lightblue/10 dark:from-gray-800 dark:to-gray-700">
                    <div className="text-3xl font-bold text-trine-green mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop"
                  alt="Operations center"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Operational Excellence</h3>
                  <p className="text-white/90 text-sm">Your success is our mission</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-8 h-8 text-trine-green mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">40%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Cost Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-trine-green/10 to-trine-lightblue/10 text-trine-green font-semibold text-sm mb-4">
              <Zap className="w-4 h-4 inline mr-2" />
              Service Catalog
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Managed <span className="bg-gradient-to-r from-trine-green to-trine-lightblue bg-clip-text text-transparent">Service Offerings</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your operational needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {serviceOfferings.map((service, index) => (
              <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-trine-green/20 to-trine-lightblue/20 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trine-green/20 to-trine-lightblue/10 flex items-center justify-center mr-4 group-hover:from-trine-green group-hover:to-trine-lightblue group-hover:shadow-lg transition-all duration-300 flex-shrink-0">
                      <service.icon className="w-8 h-8 text-trine-green group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-trine-green transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-trine-green mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-trine-orange/10 to-trine-lightblue/10 text-trine-orange font-semibold text-sm mb-4">
              <Award className="w-4 h-4 inline mr-2" />
              Key Advantages
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Benefits of <span className="text-trine-orange">Managed Services</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Why organizations choose managed services for operational excellence
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
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-trine-orange transition-colors">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Service Level <span className="bg-gradient-to-r from-trine-lightblue to-trine-green bg-clip-text text-transparent">Agreements</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Guaranteed performance metrics backed by contractual commitments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slaMetrics.map((sla, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-trine-lightblue/10 text-trine-lightblue rounded-full text-xs font-medium">
                    {sla.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{sla.metric}</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-trine-green to-trine-lightblue bg-clip-text text-transparent">
                  {sla.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent">Engagement Process</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A structured approach to successful managed services implementation
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 shadow-lg text-center h-full">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-trine-orange to-trine-green rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold mt-4 mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Industries <span className="text-trine-green">We Serve</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tailored managed services for diverse industry needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trine-green to-trine-lightblue flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <industry.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{industry.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-trine-green via-trine-lightblue to-trine-orange">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Partner with Trine Solutions for world-class managed services. 
              Let us handle the complexity while you focus on growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/consulting/statement-of-work" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Explore SOW Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagedServices;
