import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Lock, Eye, AlertTriangle, ArrowLeft, PlayCircle, Star, Quote, Zap, Users, Target, TrendingUp } from 'lucide-react';

const Cybersecurity = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const securityServices = [
    {
      icon: Shield,
      title: "Security Assessment",
      description: "Comprehensive evaluation of your security posture and vulnerability identification",
      features: ["Penetration Testing", "Vulnerability Scanning", "Security Auditing", "Compliance Assessment"],
      color: "from-red-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
    },
    {
      icon: Lock,
      title: "Identity & Access Management",
      description: "Secure user authentication and authorization systems with zero-trust architecture",
      features: ["Multi-Factor Authentication", "Single Sign-On", "Privileged Access Management", "Identity Governance"],
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop"
    },
    {
      icon: Eye,
      title: "Security Monitoring",
      description: "24/7 threat detection and incident response with advanced SIEM solutions",
      features: ["Real-time Monitoring", "Threat Intelligence", "Incident Response", "Forensics Analysis"],
      color: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
    },
    {
      icon: AlertTriangle,
      title: "Risk Management",
      description: "Proactive risk assessment and mitigation strategies for enterprise security",
      features: ["Risk Assessment", "Security Policies", "Compliance Management", "Business Continuity"],
      color: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
    }
  ];

  const threatLandscape = [
    {
      threat: "Advanced Persistent Threats",
      description: "Sophisticated, long-term attacks targeting specific organizations",
      impact: "Data theft, intellectual property loss, operational disruption",
      mitigation: "Multi-layered defense, behavioral analysis, threat hunting"
    },
    {
      threat: "Ransomware Attacks",
      description: "Malicious software that encrypts data and demands payment",
      impact: "Business disruption, financial loss, reputation damage",
      mitigation: "Backup strategies, endpoint protection, employee training"
    },
    {
      threat: "Insider Threats",
      description: "Security risks from employees, contractors, or business associates",
      impact: "Data breaches, intellectual property theft, sabotage",
      mitigation: "Access controls, monitoring, background checks, training"
    },
    {
      threat: "Supply Chain Attacks",
      description: "Attacks targeting less-secure third-party vendors or suppliers",
      impact: "Widespread compromise, data breaches, operational disruption",
      mitigation: "Vendor assessment, secure development, continuous monitoring"
    }
  ];

  const complianceFrameworks = [
    { name: "SOC 2", description: "Service Organization Control 2 for data security", icon: "🔐" },
    { name: "ISO 27001", description: "International standard for information security management", icon: "🏆" },
    { name: "GDPR", description: "General Data Protection Regulation compliance", icon: "🇪🇺" },
    { name: "HIPAA", description: "Healthcare data protection requirements", icon: "🏥" },
    { name: "PCI DSS", description: "Payment Card Industry Data Security Standard", icon: "💳" },
    { name: "NIST", description: "National Institute of Standards and Technology framework", icon: "📊" }
  ];

  const securityStats = [
    { value: "99.9%", label: "Threat Detection Rate", icon: Eye },
    { value: "< 5 min", label: "Response Time", icon: Zap },
    { value: "24/7", label: "Monitoring Coverage", icon: Shield },
    { value: "100%", label: "Compliance Achievement", icon: CheckCircle2 }
  ];

  const caseStudies = [
    {
      industry: "Banking & Finance",
      challenge: "Sophisticated phishing attacks targeting customer credentials",
      solution: "Implemented advanced email security, user training, and behavioral analytics",
      results: "95% reduction in successful phishing attempts, zero data breaches in 24 months"
    },
    {
      industry: "Healthcare",
      challenge: "Legacy systems vulnerable to ransomware and compliance gaps",
      solution: "Network segmentation, endpoint protection, and HIPAA compliance program",
      results: "Achieved HIPAA compliance, prevented 3 major ransomware attacks"
    },
    {
      industry: "Manufacturing",
      challenge: "Industrial IoT devices creating security vulnerabilities",
      solution: "OT/IT network segregation, device authentication, and monitoring",
      results: "Secured 500+ IoT devices, maintained production uptime of 99.8%"
    }
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      position: "CISO, Global Financial Services",
      content: "Their cybersecurity expertise helped us achieve SOC 2 compliance and significantly improved our security posture against evolving threats.",
      rating: 5
    },
    {
      name: "Mark Thompson",
      position: "IT Director, Healthcare Alliance",
      content: "The 24/7 security monitoring and incident response capabilities have been invaluable in protecting our patient data and maintaining operations.",
      rating: 5
    }
  ];

  const securityLayers = [
    {
      layer: "Perimeter Security",
      description: "First line of defense protecting network boundaries",
      technologies: ["Firewalls", "IPS/IDS", "DDoS Protection", "VPN Gateways"]
    },
    {
      layer: "Endpoint Security",
      description: "Protection for all devices accessing your network",
      technologies: ["Antivirus", "EDR/XDR", "Device Control", "Mobile Security"]
    },
    {
      layer: "Data Protection",
      description: "Safeguarding sensitive information at rest and in transit",
      technologies: ["Encryption", "DLP", "Database Security", "Key Management"]
    },
    {
      layer: "Identity Security",
      description: "Ensuring only authorized users access systems and data",
      technologies: ["MFA", "SSO", "PAM", "Identity Analytics"]
    },
    {
      layer: "Application Security",
      description: "Securing applications throughout their lifecycle",
      technologies: ["SAST", "DAST", "IAST", "Runtime Protection"]
    }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop"
            alt="Cybersecurity Operations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-orange-900/80 to-blue-900/90"></div>
        </div>
        
        {/* Security Grid Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}></div>
        </div>

        {/* Animated Security Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-red-400 mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-blue-400 bg-clip-text text-transparent">
                Cybersecurity
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Comprehensive cybersecurity solutions to protect your organization from evolving threats and ensure business continuity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Get Security Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/portfolio" className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                View Security Solutions
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
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">Services</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-red-500 font-medium">Cybersecurity</span>
          </nav>
        </div>
      </section>

      {/* Security Statistics */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {securityStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Comprehensive <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Security Services</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Multi-layered security solutions designed to protect against the full spectrum of cyber threats
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {securityServices.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="grid md:grid-cols-2">
                  <div className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Layers */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Defense in <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Depth</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Multi-layered security architecture providing comprehensive protection at every level
            </p>
          </div>

          <div className="space-y-8">
            {securityLayers.map((layer, index) => (
              <div key={index} className="group">
                <div className={`grid lg:grid-cols-3 gap-8 items-center p-8 rounded-3xl transition-all duration-300 ${
                  index % 2 === 0 
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700' 
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700'
                } hover:shadow-lg`}>
                  
                  <div className="text-center lg:text-left">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                      index % 2 === 0 
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-6xl font-bold text-gray-100 dark:text-gray-800 mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{layer.layer}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{layer.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Key Technologies</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {layer.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Landscape */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Current <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Threat Landscape</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understanding today's cyber threats and our proven mitigation strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {threatLandscape.map((threat, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{threat.threat}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{threat.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Impact</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{threat.impact}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Mitigation</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{threat.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Compliance <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Frameworks</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive compliance management for industry standards and regulations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceFrameworks.map((framework, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {framework.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{framework.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{framework.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Security <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real-world examples of how our cybersecurity solutions protected organizations from threats
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="grid lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-1">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                      {study.industry}
                    </span>
                  </div>
                  
                  <div className="lg:col-span-3 space-y-6">
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
              Client <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Testimonials</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg">
                <Quote className="w-12 h-12 text-red-300 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
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
      <section className="py-20 bg-gradient-to-br from-red-600 via-orange-600 to-blue-600">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Secure Your Digital Future
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Don't wait for a security incident to act. Protect your organization with enterprise-grade 
              cybersecurity solutions designed for today's threat landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Get Security Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/insights" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Security Insights
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cybersecurity;