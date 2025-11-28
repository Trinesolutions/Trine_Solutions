import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Users, Target, TrendingUp, Layers, Monitor, Smartphone, Globe, ArrowLeft, PlayCircle, Star, Quote } from 'lucide-react';

const DigitalTransformation = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const transformationSteps = [
    {
      icon: Target,
      title: "Strategic Assessment",
      description: "Comprehensive analysis of your current digital maturity and future goals",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Layers,
      title: "Architecture Design", 
      description: "Design scalable digital architecture aligned with business objectives",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Change Management",
      description: "Guide your organization through cultural and operational transformation",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Continuous Innovation",
      description: "Establish frameworks for ongoing digital evolution and improvement",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const capabilities = [
    "Enterprise Digital Strategy",
    "Legacy System Modernization", 
    "Process Automation & Optimization",
    "Digital Customer Experience",
    "Data-Driven Decision Making",
    "Agile Transformation",
    "Digital Workforce Training",
    "Innovation Lab Setup"
  ];

  const technologies = [
    "Cloud Platforms (AWS, Azure, GCP)",
    "Artificial Intelligence & ML",
    "Internet of Things (IoT)",
    "Robotic Process Automation",
    "Blockchain Technology",
    "Edge Computing",
    "Microservices Architecture",
    "API Management"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CTO, TechCorp Industries",
      content: "Trine's digital transformation strategy increased our operational efficiency by 40% and reduced costs significantly.",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "VP of Operations, Global Solutions",
      content: "The team's expertise in change management made our digital transformation seamless and successful.",
      rating: 5
    }
  ];

  const caseStudies = [
    {
      industry: "Financial Services",
      challenge: "Legacy banking systems limiting customer experience",
      solution: "Implemented cloud-native platform with AI-powered services",
      results: "50% faster transaction processing, 85% customer satisfaction increase"
    },
    {
      industry: "Healthcare",
      challenge: "Disconnected systems affecting patient care coordination", 
      solution: "Integrated digital health platform with real-time data sharing",
      results: "30% reduction in patient wait times, improved care outcomes"
    }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop"
            alt="Digital Transformation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-teal-900/90"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-16 h-16 text-orange-400 mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Transformation
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Revolutionize your business with cutting-edge digital solutions that drive innovation, efficiency, and sustainable growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/portfolio" className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                View Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">Services</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-orange-500 font-medium">Digital Transformation</span>
          </nav>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Transform Your Business for the Digital Age
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Digital transformation isn't just about technology—it's about reimagining how your organization operates, 
                delivers value to customers, and competes in an increasingly digital world. Our comprehensive approach 
                ensures your transformation journey is strategic, sustainable, and successful.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-700">
                  <div className="text-3xl font-bold text-orange-500 mb-2">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700">
                  <div className="text-3xl font-bold text-blue-500 mb-2">40%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Avg. Efficiency Gain</div>
                </div>
              </div>

              <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Digital workspace"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Modern Digital Workplace</h3>
                  <p className="text-white/90 text-sm">Empowering teams with cutting-edge technology</p>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">250+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Projects Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Transformation Process</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A proven methodology that guides organizations through successful digital transformation journeys
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformationSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 dark:text-gray-800 group-hover:text-gray-200 dark:group-hover:text-gray-700 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Connecting Line */}
                {index < transformationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & Technologies */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Capabilities */}
            <div>
              <div className="sticky top-24">
                <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  Core <span className="text-orange-500">Capabilities</span>
                </h3>
                <div className="space-y-4">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-700 transition-all duration-300">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                      <span className="font-medium text-gray-900 dark:text-white">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Key <span className="text-blue-500">Technologies</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="group p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Monitor className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{tech}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Success <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real transformations delivering measurable business impact
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="mb-6">
                  <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                    {study.industry}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Challenge</h4>
                    <p className="text-gray-600 dark:text-gray-300">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Solution</h4>
                    <p className="text-gray-600 dark:text-gray-300">{study.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Results</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">{study.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Client <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Testimonials</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg">
                <Quote className="w-12 h-12 text-purple-300 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
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
      <section className="py-20 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Join hundreds of organizations that have successfully transformed their operations with our expertise.
              Let's discuss your digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/case-studies" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                View Case Studies
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalTransformation;