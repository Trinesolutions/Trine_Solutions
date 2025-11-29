import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Clock, 
  DollarSign, 
  Shield, 
  Target, 
  TrendingUp,
  Building2,
  Briefcase,
  HeartPulse,
  Landmark,
  Cog,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Search,
  UserCheck,
  FileCheck,
  Handshake
} from 'lucide-react';
import SEO, { pageSEO } from '@/components/SEO';

const ContingentStaffing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const benefits = [
    {
      icon: Clock,
      title: "Flexibility",
      description: "Scale your workforce up or down based on project demands and business cycles without long-term commitments."
    },
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Reduce overhead costs associated with full-time employees including benefits, training, and administrative expenses."
    },
    {
      icon: Target,
      title: "Specialized Skills",
      description: "Access niche expertise and specialized skills for specific projects without permanent hiring obligations."
    },
    {
      icon: Shield,
      title: "Reduced Risk",
      description: "Minimize employment risks with flexible arrangements and compliance handled by our expert team."
    }
  ];

  const processSteps = [
    {
      icon: Search,
      title: "Requirements Analysis",
      description: "We work closely with you to understand your staffing needs, project requirements, and company culture."
    },
    {
      icon: Users,
      title: "Talent Sourcing",
      description: "Our extensive network and advanced sourcing techniques help us find the perfect candidates quickly."
    },
    {
      icon: UserCheck,
      title: "Screening & Vetting",
      description: "Rigorous background checks, skills assessments, and interviews ensure quality candidates."
    },
    {
      icon: FileCheck,
      title: "Placement",
      description: "Seamless onboarding and integration of contingent workers into your team and projects."
    },
    {
      icon: Handshake,
      title: "Ongoing Support",
      description: "Continuous support, performance monitoring, and relationship management throughout the engagement."
    }
  ];

  const industries = [
    { icon: Building2, name: "Information Technology", roles: "Developers, DevOps, QA Engineers" },
    { icon: HeartPulse, name: "Healthcare", roles: "Nurses, Medical Technicians, Admin Staff" },
    { icon: Landmark, name: "Finance & Banking", roles: "Analysts, Accountants, Compliance Officers" },
    { icon: Cog, name: "Engineering", roles: "Mechanical, Electrical, Civil Engineers" },
    { icon: Briefcase, name: "Professional Services", roles: "Consultants, Project Managers, Analysts" },
    { icon: GraduationCap, name: "Education", roles: "Instructors, Administrators, IT Support" }
  ];

  const stats = [
    { value: "500+", label: "Placements Annually" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "48hrs", label: "Average Time to Present" },
    { value: "85%", label: "Retention Rate" }
  ];

  const faqs = [
    {
      question: "What is contingent staffing?",
      answer: "Contingent staffing refers to hiring temporary or contract workers to fulfill specific business needs. These workers are employed on a non-permanent basis and can be engaged for short-term projects, seasonal work, or to fill gaps in your workforce."
    },
    {
      question: "How quickly can you provide contingent workers?",
      answer: "Depending on the role requirements, we can typically present qualified candidates within 24-48 hours. For specialized positions, the timeline may be slightly longer to ensure we find the right match."
    },
    {
      question: "Who handles payroll and benefits for contingent workers?",
      answer: "As the staffing agency, we handle all payroll processing, benefits administration, tax withholdings, and compliance requirements for contingent workers, reducing your administrative burden."
    },
    {
      question: "Can contingent workers transition to permanent employees?",
      answer: "Yes! Many of our contingent placements transition to permanent roles. We offer contract-to-hire arrangements that allow both parties to evaluate fit before making a permanent commitment."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve a wide range of industries including IT, Healthcare, Finance, Engineering, Professional Services, and Education. Our diverse talent pool allows us to meet staffing needs across various sectors."
    }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <SEO 
        {...pageSEO.contingentStaffing}
        canonicalUrl="https://trinesolutions.com/consulting/contingent-staffing"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Consulting Services', url: 'https://trinesolutions.com/consulting' },
          { name: 'Contingent Staffing', url: 'https://trinesolutions.com/consulting/contingent-staffing' }
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop"
            alt="Contingent Staffing - Flexible Workforce Solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-trine-black/90 via-trine-black/80 to-trine-orange/40"></div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-trine-orange to-trine-lightblue rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-trine-green to-trine-lightblue rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-16 h-16 text-trine-orange mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green bg-clip-text text-transparent">
                Contingent Staffing
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-4 text-trine-orange font-semibold">
              Flexible Workforce Solutions
            </p>
            <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
              Access top talent on-demand with our comprehensive contingent staffing services. 
              Scale your workforce efficiently while we handle the complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-trine-orange to-trine-lightblue rounded-full font-semibold hover:shadow-lg hover:shadow-trine-orange/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Start Hiring
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
            <span className="text-trine-orange font-medium">Contingent Staffing</span>
          </nav>
        </div>
      </section>

      {/* What is Contingent Staffing */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                What is <span className="text-trine-orange">Contingent Staffing</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Contingent staffing is a flexible workforce strategy that allows organizations to hire 
                temporary or contract workers to meet specific business needs. Unlike permanent employees, 
                contingent workers are engaged for defined periods or projects, providing businesses with 
                agility and cost-effectiveness.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                At Trine Solutions, we specialize in connecting businesses with highly qualified contingent 
                talent across various industries. Our comprehensive approach ensures you get the right 
                people with the right skills, exactly when you need them.
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
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Agile Workforce Solutions</h3>
                  <p className="text-white/90 text-sm">Build the team you need, when you need it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Benefits of <span className="bg-gradient-to-r from-trine-orange to-trine-lightblue bg-clip-text text-transparent">Contingent Staffing</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover why leading organizations choose contingent staffing to stay competitive and agile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trine-orange to-trine-lightblue flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Industries <span className="text-trine-green">We Serve</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our contingent staffing solutions span across multiple industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-100 dark:border-gray-700 hover:border-trine-orange/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-trine-orange to-trine-lightblue flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{industry.name}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{industry.roles}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A streamlined approach to connecting you with the right talent
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-trine-orange rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trine-orange/20 to-trine-lightblue/20 flex items-center justify-center mx-auto mb-4 mt-4">
                      <step.icon className="w-8 h-8 text-trine-orange" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Frequently Asked <span className="text-trine-lightblue">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-trine-orange flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-trine-orange flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
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
              Ready to Build Your Flexible Workforce?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Partner with Trine Solutions for your contingent staffing needs. 
              Let us help you find the perfect talent to drive your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/consulting/contract-to-hire" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Explore Contract-to-Hire
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContingentStaffing;
