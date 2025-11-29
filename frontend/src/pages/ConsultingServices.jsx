import { Link } from 'react-router-dom';
import { Users, Briefcase, Calendar, FileText, Settings, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '@/components/SEO';

const ConsultingServices = () => {
  const services = [
    {
      id: 'contingent-staffing',
      title: 'Contingent Staffing',
      description: 'Flexible staffing solutions to meet your temporary and project-based needs. We provide top-tier talent to help you scale your workforce efficiently.',
      icon: Users,
      path: '/consulting/contingent-staffing',
      features: ['Rapid Deployment', 'Scalable Workforce', 'Vetted Professionals', 'Cost-Effective'],
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:shadow-orange-500/50'
    },
    {
      id: 'permanent-hiring',
      title: 'Permanent Hiring',
      description: 'Find the perfect long-term additions to your team. Our rigorous screening process ensures you get candidates who fit your culture and technical requirements.',
      icon: Briefcase,
      path: '/consulting/permanent-hiring',
      features: ['Executive Search', 'Cultural Fit Assessment', 'Technical Screening', 'Retention Focus'],
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:shadow-green-500/50'
    },
    {
      id: 'contract-to-hire',
      title: 'Contract to Hire',
      description: 'Evaluate talent on the job before making a long-term commitment. Reduce hiring risks while ensuring the candidate is the right match for your organization.',
      icon: Calendar,
      path: '/consulting/contract-to-hire',
      features: ['Risk Mitigation', 'Performance Evaluation', 'Seamless Transition', 'Flexible Terms'],
      color: 'from-cyan-500 to-cyan-600',
      hoverColor: 'hover:shadow-cyan-500/50'
    },
    {
      id: 'statement-of-work',
      title: 'Statement of Work',
      description: 'Outcome-based project delivery. We take responsibility for deliverables and milestones, allowing you to focus on your core business objectives.',
      icon: FileText,
      path: '/consulting/statement-of-work',
      features: ['Defined Deliverables', 'Milestone Tracking', 'Project Management', 'Quality Assurance'],
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:shadow-purple-500/50'
    },
    {
      id: 'managed-services',
      title: 'Managed Services',
      description: 'Comprehensive management of your IT operations and specific business functions. Improve efficiency and reduce operational overhead.',
      icon: Settings,
      path: '/consulting/managed-services',
      features: ['24/7 Support', 'SLA Adherence', 'Process Optimization', 'Strategic Partnership'],
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:shadow-indigo-500/50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO 
        title="Consulting Services - Trine Solutions"
        description="Expert consulting services including Contingent Staffing, Permanent Hiring, Contract to Hire, Statement of Work, and Managed Services."
        canonicalUrl="https://trinesolutions.com/consulting"
      />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="container relative z-10 text-center text-white px-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="flex w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold">Strategic Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-fade-in-up leading-tight">
            Strategic <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-green-300 bg-clip-text text-transparent">Consulting</span> Services
          </h1>
          <p className="text-lg md:text-2xl max-w-4xl mx-auto opacity-95 animate-fade-in-up delay-100 leading-relaxed">
            Empower your business with specialized talent, strategic solutions, and proven expertise to drive transformation and sustainable growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Service</span> Portfolio
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the right engagement model for your unique business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id}
                  className={`group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg ${service.hoverColor} hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500`}></div>
                  
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="relative text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="relative text-gray-600 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  <div className="relative space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to={service.path}
                    className={`relative inline-flex items-center justify-center w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${service.color} text-white shadow-lg group-hover:shadow-xl hover:scale-105`}
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white leading-tight">
              Ready to Transform Your Workforce Strategy?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed">
              Partner with Trine Solutions to find the perfect consulting solution for your unique business needs. Let us help you achieve exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                View Core Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultingServices;
