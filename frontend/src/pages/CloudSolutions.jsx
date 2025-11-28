import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Cloud, Server, Shield, Database, ArrowLeft, PlayCircle, Star, Quote, Zap, Globe, Lock, BarChart3 } from 'lucide-react';

const CloudSolutions = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const cloudServices = [
    {
      icon: Cloud,
      title: "Cloud Migration",
      description: "Seamless migration from on-premises to cloud infrastructure with zero downtime",
      features: ["Assessment & Planning", "Data Migration", "Application Refactoring", "Testing & Validation"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Server,
      title: "Infrastructure as Code",
      description: "Automated, scalable, and reproducible cloud infrastructure deployment",
      features: ["Terraform & ARM Templates", "CI/CD Pipelines", "Version Control", "Environment Management"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Cloud Security",
      description: "Comprehensive security solutions for cloud-native environments",
      features: ["Identity Management", "Network Security", "Compliance", "Threat Detection"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Cloud Optimization",
      description: "Continuous monitoring and optimization for cost and performance efficiency",
      features: ["Cost Management", "Performance Tuning", "Auto-scaling", "Resource Optimization"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const cloudPlatforms = [
    {
      name: "Amazon Web Services",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop",
      services: ["EC2", "Lambda", "S3", "RDS", "EKS", "CloudFormation"],
      specialties: ["Serverless Architecture", "Container Orchestration", "Big Data Analytics"]
    },
    {
      name: "Microsoft Azure",
      logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
      services: ["Virtual Machines", "Azure Functions", "Blob Storage", "SQL Database", "AKS", "ARM Templates"],
      specialties: ["Hybrid Cloud", "Enterprise Integration", "AI/ML Services"]
    },
    {
      name: "Google Cloud Platform",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop",
      services: ["Compute Engine", "Cloud Functions", "Cloud Storage", "Cloud SQL", "GKE", "Deployment Manager"],
      specialties: ["Machine Learning", "Data Analytics", "Kubernetes Native"]
    }
  ];

  const architecturePatterns = [
    {
      pattern: "Microservices Architecture",
      description: "Scalable, maintainable applications built as loosely coupled services",
      benefits: ["Independent Scaling", "Technology Diversity", "Fault Isolation", "Team Autonomy"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
    },
    {
      pattern: "Serverless Computing",
      description: "Event-driven compute services that scale automatically and reduce operational overhead",
      benefits: ["Zero Server Management", "Automatic Scaling", "Pay-per-Use", "High Availability"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
    },
    {
      pattern: "Container Orchestration",
      description: "Automated deployment, scaling, and management of containerized applications",
      benefits: ["Consistent Deployment", "Resource Efficiency", "Service Discovery", "Load Balancing"],
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=400&h=300&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "David Rodriguez",
      position: "Infrastructure Director, Global Manufacturing",
      content: "Our cloud migration reduced operational costs by 60% while improving system reliability and performance significantly.",
      rating: 5
    },
    {
      name: "Lisa Park",
      position: "CTO, FinTech Solutions",
      content: "The serverless architecture implementation allowed us to scale from 1000 to 1 million users seamlessly.",
      rating: 5
    }
  ];

  const metrics = [
    { value: "99.99%", label: "Uptime SLA", icon: Zap },
    { value: "60%", label: "Cost Reduction", icon: BarChart3 },
    { value: "10x", label: "Faster Deployment", icon: Globe },
    { value: "100%", label: "Security Compliance", icon: Lock }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop"
            alt="Cloud Infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-cyan-900/90"></div>
        </div>
        
        {/* Animated Cloud Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Cloud className="w-16 h-16 text-blue-400 mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Cloud Solutions
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Accelerate your business with scalable, secure, and cost-effective cloud infrastructure solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Get Cloud Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/portfolio" className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                View Solutions
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
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Services</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-blue-500 font-medium">Cloud Solutions</span>
          </nav>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <metric.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{metric.value}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Comprehensive <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Cloud Services</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              End-to-end cloud solutions designed to modernize your infrastructure and accelerate digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cloudServices.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Platforms */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Multi-Cloud <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Deep expertise across all major cloud platforms to help you choose the right solution for your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {cloudPlatforms.map((platform, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={platform.logo} 
                    alt={platform.name}
                    className="w-16 h-16 rounded-2xl object-cover mr-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{platform.name}</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Core Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {platform.services.map((service, serviceIndex) => (
                      <span key={serviceIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Specialties</h4>
                  <div className="space-y-2">
                    {platform.specialties.map((specialty, specialtyIndex) => (
                      <div key={specialtyIndex} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Patterns */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Modern <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Architecture Patterns</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Leverage cutting-edge architectural patterns to build scalable, resilient, and maintainable cloud applications
            </p>
          </div>

          <div className="space-y-12">
            {architecturePatterns.map((pattern, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{pattern.pattern}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{pattern.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {pattern.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="font-medium text-gray-900 dark:text-white">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={pattern.image}
                      alt={pattern.pattern}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white font-semibold">{pattern.pattern}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Cloud Migration <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our proven 6-phase migration methodology ensures zero-downtime transitions and optimal cloud adoption
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 hidden lg:block"></div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { phase: "Assessment", description: "Current infrastructure analysis and cloud readiness evaluation", icon: Database },
                { phase: "Planning", description: "Migration strategy, timeline, and resource planning", icon: Server },
                { phase: "Design", description: "Target architecture design and security framework", icon: Shield },
                { phase: "Migration", description: "Phased migration with continuous testing and validation", icon: Cloud },
                { phase: "Optimization", description: "Performance tuning and cost optimization", icon: BarChart3 },
                { phase: "Support", description: "Ongoing monitoring, maintenance, and support", icon: Zap }
              ].map((step, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-10 hidden lg:block"></div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 mt-8 lg:mt-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{step.phase}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Client <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Success Stories</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                <Quote className="w-12 h-12 text-blue-300 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
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
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Accelerate Your Cloud Journey
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Transform your infrastructure with enterprise-grade cloud solutions. 
              Get started with a free cloud assessment and migration roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Get Free Assessment
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

export default CloudSolutions;