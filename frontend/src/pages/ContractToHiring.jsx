import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Clock, 
  Eye, 
  ThumbsUp,
  Calendar,
  Briefcase,
  TrendingUp,
  Shield,
  Target,
  Zap,
  Building2,
  Award,
  UserCheck,
  User
} from 'lucide-react';
import SEO, { pageSEO } from '@/components/SEO';

const ContractToHiring = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const howItWorks = [
    {
      step: "1",
      title: "Contract Phase",
      description: "Candidate starts as a contractor, working on your projects while both parties evaluate fit.",
      duration: "Typically 3-6 months"
    },
    {
      step: "2",
      title: "Evaluation Period",
      description: "Assess skills, work ethic, cultural alignment, and team dynamics in real work scenarios.",
      duration: "Ongoing assessment"
    },
    {
      step: "3",
      title: "Conversion Decision",
      description: "Based on performance and mutual interest, decide whether to extend a permanent offer.",
      duration: "End of contract"
    },
    {
      step: "4",
      title: "Permanent Hire",
      description: "Seamless transition to full-time employment with your organization.",
      duration: "New beginning"
    }
  ];

  const employerBenefits = [
    {
      icon: Eye,
      title: "Try Before You Commit",
      description: "Evaluate candidates in real work situations before making long-term commitments."
    },
    {
      icon: Target,
      title: "Performance Evaluation",
      description: "Assess actual job performance, problem-solving abilities, and work quality firsthand."
    },
    {
      icon: Users,
      title: "Cultural Fit Assessment",
      description: "Determine how well candidates integrate with your team and company culture."
    },
    {
      icon: Shield,
      title: "Reduced Hiring Risk",
      description: "Minimize costly bad hires by having extended evaluation periods."
    },
    {
      icon: Clock,
      title: "Time to Train",
      description: "Use the contract period to train and develop employees for your specific needs."
    },
    {
      icon: TrendingUp,
      title: "Budget Flexibility",
      description: "Manage hiring budgets more effectively with staged commitment approach."
    }
  ];

  const candidateBenefits = [
    {
      icon: Building2,
      title: "Test Company Culture",
      description: "Experience the work environment, team dynamics, and company values before committing."
    },
    {
      icon: Zap,
      title: "Demonstrate Skills",
      description: "Showcase your abilities through actual work rather than just interviews."
    },
    {
      icon: Briefcase,
      title: "Career Exploration",
      description: "Explore different roles and industries while maintaining employment."
    },
    {
      icon: Award,
      title: "Earn While Learning",
      description: "Gain valuable experience and skills while earning competitive compensation."
    },
    {
      icon: UserCheck,
      title: "Pathway to Permanence",
      description: "Clear route to permanent employment with proven track record."
    },
    {
      icon: ThumbsUp,
      title: "Mutual Selection",
      description: "Make informed decisions about your career fit before long-term commitment."
    }
  ];

  const timeline = [
    { phase: "Week 1-2", activity: "Onboarding & Integration", color: "from-trine-orange to-trine-lightblue" },
    { phase: "Month 1-2", activity: "Skills Assessment & Training", color: "from-trine-lightblue to-trine-green" },
    { phase: "Month 3-4", activity: "Performance Evaluation", color: "from-trine-green to-trine-orange" },
    { phase: "Month 5-6", activity: "Conversion Discussion", color: "from-trine-orange to-trine-green" }
  ];

  const stats = [
    { value: "78%", label: "Conversion Rate" },
    { value: "95%", label: "Retention After Conversion" },
    { value: "60%", label: "Faster Time-to-Productivity" },
    { value: "40%", label: "Reduced Hiring Costs" }
  ];

  const successMetrics = [
    {
      category: "Technology Sector",
      conversion: "82%",
      retention: "96%",
      avgDuration: "4 months"
    },
    {
      category: "Healthcare Industry",
      conversion: "75%",
      retention: "94%",
      avgDuration: "5 months"
    },
    {
      category: "Finance & Banking",
      conversion: "80%",
      retention: "97%",
      avgDuration: "4.5 months"
    }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <SEO 
        {...pageSEO.contractToHire}
        canonicalUrl="https://trinesolutions.com/consulting/contract-to-hire"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Consulting Services', url: 'https://trinesolutions.com/consulting' },
          { name: 'Contract to Hire', url: 'https://trinesolutions.com/consulting/contract-to-hire' }
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop"
            alt="Contract to Hire - Try Before You Hire"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-trine-black/90 via-trine-black/80 to-trine-lightblue/40"></div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-trine-lightblue to-trine-green rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-trine-orange to-trine-lightblue rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-16 h-16 text-trine-lightblue mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-trine-lightblue via-trine-green to-trine-orange bg-clip-text text-transparent">
                Contract to Hire
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-4 text-trine-lightblue font-semibold">
              The Best of Both Worlds
            </p>
            <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
              Minimize hiring risks with our contract-to-hire solutions. Evaluate talent in real 
              work scenarios before making permanent commitments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-trine-lightblue to-trine-green rounded-full font-semibold hover:shadow-lg hover:shadow-trine-lightblue/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
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
            <span className="text-trine-lightblue font-medium">Contract to Hire</span>
          </nav>
        </div>
      </section>

      {/* What is Contract to Hire */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                What is <span className="text-trine-lightblue">Contract to Hire</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Contract-to-hire is a staffing arrangement where a candidate initially works as a 
                contractor for a specified period before transitioning to a permanent position. 
                This model allows both employers and candidates to evaluate fit before making 
                long-term commitments.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                At Trine Solutions, we facilitate seamless contract-to-hire arrangements that 
                benefit both parties. Our approach reduces hiring risks while ensuring candidates 
                find roles where they can truly thrive and grow.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-trine-lightblue/10 to-trine-green/10 dark:from-gray-800 dark:to-gray-700">
                    <div className="text-3xl font-bold text-trine-lightblue mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=400&fit=crop"
                  alt="Contract evaluation meeting"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Evaluate with Confidence</h3>
                  <p className="text-white/90 text-sm">Make informed hiring decisions</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-8 h-8 text-trine-lightblue mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">78%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              How <span className="bg-gradient-to-r from-trine-lightblue to-trine-green bg-clip-text text-transparent">It Works</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A straightforward process designed for success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-trine-lightblue to-trine-green flex items-center justify-center text-white font-bold text-xl mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                  <span className="inline-block px-3 py-1 bg-trine-lightblue/10 text-trine-lightblue rounded-full text-sm font-medium">
                    {step.duration}
                  </span>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-trine-lightblue to-trine-green"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Employers */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-trine-orange/10 to-trine-lightblue/10 text-trine-orange font-semibold text-sm mb-4">
              <CheckCircle2 className="w-4 h-4 inline mr-2" />
              For Employers
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Benefits for <span className="text-trine-orange">Employers</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Why leading companies choose contract-to-hire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {employerBenefits.map((benefit, index) => (
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

      {/* Benefits for Candidates */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-trine-green/10 to-trine-lightblue/10 text-trine-green font-semibold text-sm mb-4">
              <User className="w-4 h-4 inline mr-2" />
              For Candidates
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Benefits for <span className="text-trine-green">Candidates</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Why professionals choose contract-to-hire opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidateBenefits.map((benefit, index) => (
              <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-trine-green/20 to-trine-lightblue/20 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trine-green/20 to-trine-lightblue/10 flex items-center justify-center mb-6 group-hover:from-trine-green group-hover:to-trine-lightblue group-hover:shadow-lg transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-trine-green group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-trine-green transition-colors">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Typical <span className="bg-gradient-to-r from-trine-orange to-trine-lightblue bg-clip-text text-transparent">Timeline</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              What to expect during a contract-to-hire engagement
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-32 flex-shrink-0 text-right pr-6 font-bold text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.phase}
                  </div>
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} flex-shrink-0`}></div>
                  <div className="flex-grow pl-6 py-4 ml-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="font-medium text-gray-900 dark:text-white">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Success <span className="text-trine-lightblue">Metrics</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our contract-to-hire success rates by industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  {metric.category}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Conversion Rate</span>
                    <span className="font-bold text-trine-lightblue">{metric.conversion}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Post-Conversion Retention</span>
                    <span className="font-bold text-trine-green">{metric.retention}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Avg. Contract Duration</span>
                    <span className="font-bold text-trine-orange">{metric.avgDuration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-trine-lightblue via-trine-green to-trine-orange">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Try Before You Hire?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Discover how contract-to-hire can reduce your hiring risks while ensuring 
              you find the perfect fit for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Start Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/consulting/permanent-hiring" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Explore Permanent Hiring
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContractToHiring;
