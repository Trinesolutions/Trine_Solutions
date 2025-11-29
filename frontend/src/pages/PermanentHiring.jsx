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
  Zap
} from 'lucide-react';
import SEO, { pageSEO } from '@/components/SEO';

const PermanentHiring = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const benefits = [
    {
      icon: Heart,
      title: "Long-term Commitment",
      description: "Build dedicated teams invested in your company's success and growth over time."
    },
    {
      icon: Users,
      title: "Cultural Fit",
      description: "We ensure candidates align with your organization's values, mission, and work culture."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Permanent roles attract top talent seeking stability and advancement opportunities."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Rigorous vetting process ensures only the best candidates reach your team."
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
    { value: "30", label: "Days Avg. Time to Fill" },
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
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <SEO 
        {...pageSEO.permanentHiring}
        canonicalUrl="https://trinesolutions.com/consulting/permanent-hiring"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Consulting Services', url: 'https://trinesolutions.com/consulting' },
          { name: 'Permanent Hiring', url: 'https://trinesolutions.com/consulting/permanent-hiring' }
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop"
            alt="Permanent Hiring - Long-term Talent Acquisition"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-trine-black/90 via-trine-black/80 to-trine-green/40"></div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-trine-green to-trine-lightblue rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-trine-orange to-trine-lightblue rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Briefcase className="w-16 h-16 text-trine-green mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-trine-green via-trine-lightblue to-trine-orange bg-clip-text text-transparent">
                Permanent Hiring
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-4 text-trine-green font-semibold">
              Long-term Talent Acquisition
            </p>
            <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
              Build lasting teams with exceptional talent. Our permanent hiring solutions 
              connect you with professionals who will grow with your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-trine-green to-trine-lightblue rounded-full font-semibold hover:shadow-lg hover:shadow-trine-green/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Find Your Team
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
            <span className="text-trine-green font-medium">Permanent Hiring</span>
          </nav>
        </div>
      </section>

      {/* What is Permanent Hiring */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                What is <span className="text-trine-green">Permanent Hiring</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Permanent hiring, also known as direct placement, is the process of recruiting full-time 
                employees who become integral members of your organization. Unlike temporary or contract 
                positions, permanent hires join your company as regular employees with full benefits.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                At Trine Solutions, we specialize in finding exceptional talent that not only meets your 
                technical requirements but also aligns with your company culture and long-term vision. 
                Our comprehensive approach ensures quality placements that contribute to lasting success.
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
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=400&fit=crop"
                  alt="Professional interview"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Expert Talent Acquisition</h3>
                  <p className="text-white/90 text-sm">Finding the perfect fit for your organization</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-8 h-8 text-trine-green mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">92%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Retention Rate</div>
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
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-trine-green/10 to-trine-lightblue/10 text-trine-green font-semibold text-sm mb-4">
              <Heart className="w-4 h-4 inline mr-2" />
              Strategic Benefits
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Benefits of <span className="bg-gradient-to-r from-trine-green to-trine-lightblue bg-clip-text text-transparent">Permanent Hiring</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Why organizations choose permanent hiring for building strong, dedicated teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-trine-green/20 to-trine-lightblue/20 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trine-green/20 to-trine-lightblue/10 flex items-center justify-center mb-6 group-hover:from-trine-green group-hover:to-trine-lightblue group-hover:shadow-lg transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-trine-green group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-trine-green transition-colors">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Methodology */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-trine-orange/10 to-trine-green/10 text-trine-orange font-semibold text-sm mb-4">
              <Target className="w-4 h-4 inline mr-2" />
              6-Step Process
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent">Recruitment Methodology</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A proven systematic process that delivers exceptional permanent hires
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green transform -translate-y-1/2 opacity-30"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {methodology.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group-hover:border-trine-orange/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-trine-orange/10 to-trine-green/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="absolute top-6 right-6 text-5xl font-bold text-gray-100 dark:text-gray-700 group-hover:text-trine-orange/20 transition-colors z-0">
                      {step.step}
                    </div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-trine-orange/20 to-trine-green/10 flex items-center justify-center mb-6 group-hover:from-trine-orange group-hover:to-trine-green group-hover:shadow-lg transition-all duration-300">
                        <step.icon className="w-7 h-7 text-trine-orange group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-trine-orange transition-colors">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries & Roles */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Industries & Roles <span className="text-trine-lightblue">We Specialize In</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializations.map((spec, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Building2 className="w-6 h-6 text-trine-green mr-2" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{spec.category}</h3>
                </div>
                <ul className="space-y-2">
                  {spec.roles.map((role, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-trine-green mr-2 flex-shrink-0" />
                      <span className="text-sm">{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Success <span className="bg-gradient-to-r from-trine-green to-trine-orange bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real results from our permanent hiring partnerships
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-trine-green/10 text-trine-green rounded-full text-sm font-medium">
                    {story.industry}
                  </span>
                  <span className="text-2xl font-bold text-trine-orange">{story.metric}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{story.company}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Challenge</p>
                    <p className="text-gray-600 dark:text-gray-300">{story.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-trine-green">Result</p>
                    <p className="text-gray-600 dark:text-gray-300">{story.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Client <span className="bg-gradient-to-r from-trine-lightblue to-trine-green bg-clip-text text-transparent">Testimonials</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                <Quote className="w-12 h-12 text-trine-green/20 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-trine-orange fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-trine-green to-trine-lightblue rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.position}</div>
                  </div>
                </div>
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
              Ready to Build Your Dream Team?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Partner with Trine Solutions for your permanent hiring needs. 
              Let us help you find exceptional talent that drives long-term success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Start Hiring
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/consulting/contingent-staffing" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Explore Contingent Staffing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PermanentHiring;
