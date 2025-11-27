import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, TrendingUp, Users, Award, Zap, Shield, Globe, ArrowRight, Star, Target, Layers } from 'lucide-react';
import { Building2, Heart, ShoppingBag, Factory, GraduationCap, Truck, Wifi, Satellite } from 'lucide-react';
import { useEffect } from 'react';

const IndustryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const industriesData = {
    'banking-finance': {
      icon: Building2,
      name: 'Banking & Finance',
      tagline: 'Digital Banking Solutions for Tomorrow',
      description: 'Digital banking solutions, risk management, regulatory compliance, and fraud detection systems.',
      fullDescription: 'Transform your financial institution with cutting-edge digital solutions that enhance customer experience, ensure regulatory compliance, and drive operational efficiency. Our comprehensive suite of banking technologies empowers financial organizations to thrive in the digital age.',
      image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200',
      gradient: 'from-blue-600 to-purple-600',
      accent: 'blue',
      solutions: [
        {
          title: 'Core Banking Modernization',
          description: 'Upgrade legacy systems to modern, cloud-native platforms with real-time processing capabilities.',
          features: ['Real-time transactions', 'API-first architecture', 'Cloud scalability', 'Multi-currency support']
        },
        {
          title: 'Payment Processing',
          description: 'Secure, fast, and reliable payment solutions supporting multiple channels and currencies.',
          features: ['Instant payments', 'Fraud detection', 'Multi-channel support', 'PCI DSS compliance']
        },
        {
          title: 'Wealth Management',
          description: 'AI-powered investment platforms for personalized portfolio management and advisory services.',
          features: ['Robo-advisory', 'Portfolio analytics', 'Risk assessment', 'Client portal']
        },
        {
          title: 'Compliance Automation',
          description: 'Automated regulatory reporting and compliance monitoring to reduce risk and costs.',
          features: ['AML/KYC automation', 'Regulatory reporting', 'Risk monitoring', 'Audit trails']
        }
      ],
      benefits: [
        '40% faster transaction processing',
        '60% reduction in compliance costs',
        '99.9% uptime achieved',
        '50% improvement in customer satisfaction',
        '35% operational cost reduction',
        '100% regulatory compliance'
      ],
      technologies: ['Cloud Infrastructure', 'AI/ML', 'Blockchain', 'API Gateway', 'Microservices', 'Data Analytics'],
      stats: [
        { value: '40%', label: 'Faster Processing', icon: Zap },
        { value: '60%', label: 'Cost Reduction', icon: TrendingUp },
        { value: '99.9%', label: 'Uptime', icon: Shield },
        { value: '50+', label: 'Banks Served', icon: Building2 }
      ]
    },
    'healthcare': {
      icon: Heart,
      name: 'Healthcare',
      tagline: 'Revolutionizing Patient Care with Technology',
      description: 'Patient care optimization, electronic health records, telemedicine platforms, and medical IoT solutions.',
      fullDescription: 'Enhance patient outcomes and streamline healthcare operations with our comprehensive suite of digital health solutions. From EHR integration to AI-powered diagnostics, we help healthcare providers deliver better care more efficiently.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200',
      gradient: 'from-green-600 to-emerald-600',
      accent: 'green',
      solutions: [
        {
          title: 'EHR Integration',
          description: 'Seamless integration of electronic health records across multiple systems and providers.',
          features: ['Interoperability standards', 'Real-time sync', 'Patient data security', 'HL7/FHIR compliance']
        },
        {
          title: 'Telemedicine Platforms',
          description: 'Complete virtual care solutions enabling remote consultations and patient monitoring.',
          features: ['Video consultations', 'Remote monitoring', 'E-prescriptions', 'Mobile apps']
        },
        {
          title: 'Medical Imaging AI',
          description: 'AI-powered diagnostic tools for faster and more accurate medical imaging analysis.',
          features: ['Image recognition', 'Anomaly detection', 'Diagnostic support', 'Integration with PACS']
        },
        {
          title: 'Patient Data Security',
          description: 'HIPAA-compliant security solutions protecting sensitive patient information.',
          features: ['End-to-end encryption', 'Access controls', 'Audit logging', 'Compliance reporting']
        }
      ],
      benefits: [
        '50% improvement in patient outcomes',
        'HIPAA compliance achieved',
        '30% operational cost reduction',
        '65% increase in patient satisfaction',
        '40% reduction in readmission rates',
        '24/7 patient monitoring capability'
      ],
      technologies: ['Cloud Computing', 'AI/ML', 'IoT', 'Blockchain', 'Mobile Development', 'Data Analytics'],
      stats: [
        { value: '50%', label: 'Better Outcomes', icon: Heart },
        { value: '30%', label: 'Cost Savings', icon: TrendingUp },
        { value: '100%', label: 'HIPAA Compliant', icon: Shield },
        { value: '100+', label: 'Facilities Served', icon: Building2 }
      ]
    },
    'telecommunications': {
      icon: Wifi,
      name: 'Telecommunications',
      tagline: 'Powering Next-Generation Connectivity',
      description: '5G network optimization, IoT connectivity, cloud communications, and next-generation infrastructure solutions.',
      fullDescription: 'Lead the telecommunications revolution with our advanced solutions for 5G deployment, IoT connectivity, and cloud-based communications. We help telecom providers build the infrastructure of tomorrow.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200',
      gradient: 'from-cyan-600 to-blue-600',
      accent: 'cyan',
      solutions: [
        {
          title: '5G Network Deployment',
          description: 'End-to-end 5G infrastructure planning, deployment, and optimization services.',
          features: ['Network planning', 'Infrastructure deployment', 'Performance optimization', 'Edge computing integration']
        },
        {
          title: 'IoT Connectivity',
          description: 'Scalable IoT platforms supporting millions of connected devices with low latency.',
          features: ['Device management', 'Data processing', 'Security protocols', 'API integration']
        },
        {
          title: 'Cloud Communications',
          description: 'Cloud-native communication platforms for voice, video, and messaging services.',
          features: ['VoIP solutions', 'Video conferencing', 'Unified communications', 'SIP trunking']
        },
        {
          title: 'Network Security',
          description: 'Advanced security solutions protecting telecom infrastructure from cyber threats.',
          features: ['DDoS protection', 'Threat detection', 'Firewall management', 'Security audits']
        }
      ],
      benefits: [
        '60% faster network speeds',
        '99.99% network reliability',
        '40% operational efficiency gain',
        '70% reduction in latency',
        '50% increase in network capacity',
        'Support for 1M+ IoT devices'
      ],
      technologies: ['5G Technology', 'Edge Computing', 'Cloud Infrastructure', 'IoT Platforms', 'Network Analytics', 'AI/ML'],
      stats: [
        { value: '60%', label: 'Faster Speeds', icon: Zap },
        { value: '99.99%', label: 'Uptime', icon: Shield },
        { value: '1M+', label: 'IoT Devices', icon: Globe },
        { value: '40%', label: 'Cost Reduction', icon: TrendingUp }
      ]
    },
    'manufacturing': {
      icon: Factory,
      name: 'Manufacturing',
      tagline: 'Smart Factory Solutions for Industry 4.0',
      description: 'Smart factory solutions, predictive maintenance, supply chain optimization, and quality control systems.',
      fullDescription: 'Transform your manufacturing operations with Industry 4.0 solutions that optimize production, reduce downtime, and improve quality. Our smart factory technologies drive efficiency and innovation.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200',
      gradient: 'from-orange-600 to-red-600',
      accent: 'orange',
      solutions: [
        {
          title: 'Industrial IoT',
          description: 'Connected sensors and devices providing real-time visibility into production processes.',
          features: ['Real-time monitoring', 'Sensor integration', 'Data analytics', 'Alert systems']
        },
        {
          title: 'Predictive Maintenance',
          description: 'AI-powered systems predicting equipment failures before they occur.',
          features: ['Failure prediction', 'Maintenance scheduling', 'Asset tracking', 'Cost optimization']
        },
        {
          title: 'Supply Chain Visibility',
          description: 'End-to-end supply chain tracking and optimization solutions.',
          features: ['Inventory management', 'Demand forecasting', 'Supplier integration', 'Logistics optimization']
        },
        {
          title: 'Quality Automation',
          description: 'Automated quality control systems using computer vision and AI.',
          features: ['Defect detection', 'Process monitoring', 'Quality reporting', 'Compliance tracking']
        }
      ],
      benefits: [
        '35% increase in production efficiency',
        '45% reduction in downtime',
        '$5M annual savings',
        '50% faster time-to-market',
        '60% improvement in quality metrics',
        '30% energy cost reduction'
      ],
      technologies: ['IoT Platforms', 'AI/ML', 'Computer Vision', 'Digital Twin', 'Edge Computing', 'Cloud Analytics'],
      stats: [
        { value: '35%', label: 'Efficiency Gain', icon: TrendingUp },
        { value: '45%', label: 'Less Downtime', icon: Shield },
        { value: '$5M', label: 'Annual Savings', icon: Award },
        { value: '60%', label: 'Quality Improvement', icon: CheckCircle }
      ]
    },
    'retail-ecommerce': {
      icon: ShoppingBag,
      name: 'Retail & E-Commerce',
      tagline: 'Omnichannel Commerce Excellence',
      description: 'Omnichannel commerce, inventory management, customer analytics, and personalized shopping experiences.',
      fullDescription: 'Create seamless shopping experiences across all channels with our comprehensive e-commerce and retail solutions. Drive sales, improve customer loyalty, and optimize operations with data-driven insights.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      gradient: 'from-pink-600 to-rose-600',
      accent: 'pink',
      solutions: [
        {
          title: 'E-commerce Platforms',
          description: 'Scalable, feature-rich e-commerce platforms built for growth and conversion.',
          features: ['Mobile-first design', 'Payment integration', 'Order management', 'Multi-channel selling']
        },
        {
          title: 'Inventory Optimization',
          description: 'AI-powered inventory management reducing stockouts and overstock situations.',
          features: ['Demand forecasting', 'Auto-replenishment', 'Multi-location sync', 'Real-time tracking']
        },
        {
          title: 'Customer Analytics',
          description: 'Deep customer insights driving personalized experiences and targeted marketing.',
          features: ['Behavior tracking', 'Segmentation', 'Predictive analytics', 'Campaign optimization']
        },
        {
          title: 'Personalization AI',
          description: 'AI-driven product recommendations and personalized shopping experiences.',
          features: ['Product recommendations', 'Dynamic pricing', 'Personalized content', 'A/B testing']
        }
      ],
      benefits: [
        '55% increase in online sales',
        '40% improvement in customer retention',
        '25% cart abandonment reduction',
        '65% higher conversion rates',
        '50% increase in average order value',
        '70% improvement in inventory turnover'
      ],
      technologies: ['Cloud Commerce', 'AI/ML', 'Mobile Apps', 'Payment Gateways', 'CRM Systems', 'Analytics Platforms'],
      stats: [
        { value: '55%', label: 'Sales Increase', icon: TrendingUp },
        { value: '40%', label: 'Better Retention', icon: Users },
        { value: '65%', label: 'Conversion Rate', icon: Target },
        { value: '25%', label: 'Less Abandonment', icon: CheckCircle }
      ]
    },
    'education': {
      icon: GraduationCap,
      name: 'Education',
      tagline: 'Digital Learning for the Modern Age',
      description: 'Learning management systems, virtual classrooms, student analytics, and educational content platforms.',
      fullDescription: 'Transform education delivery with modern digital learning platforms that enhance engagement, improve outcomes, and expand access. Our solutions support institutions in adapting to the digital learning landscape.',
      image: 'https://img.freepik.com/free-vector/modern-hand-drawn-education-concept_23-2147906438.jpg?semt=ais_hybrid&w=740&q=80',
      gradient: 'from-indigo-600 to-purple-600',
      accent: 'indigo',
      solutions: [
        {
          title: 'LMS Implementation',
          description: 'Comprehensive learning management systems with course creation and tracking capabilities.',
          features: ['Course management', 'Assessment tools', 'Progress tracking', 'Integration APIs']
        },
        {
          title: 'Virtual Learning',
          description: 'Interactive virtual classroom platforms enabling remote and hybrid learning.',
          features: ['Live classes', 'Breakout rooms', 'Recording capabilities', 'Interactive whiteboards']
        },
        {
          title: 'Student Performance Analytics',
          description: 'Data-driven insights into student performance and learning patterns.',
          features: ['Performance dashboards', 'Early warning systems', 'Predictive analytics', 'Custom reports']
        },
        {
          title: 'Administrative Automation',
          description: 'Streamlined administrative processes from enrollment to graduation.',
          features: ['Enrollment management', 'Scheduling automation', 'Grade management', 'Parent portals']
        }
      ],
      benefits: [
        '75% increase in student engagement',
        '50% administrative time saved',
        'Global reach expansion',
        '60% improvement in learning outcomes',
        '40% reduction in operational costs',
        '95% student satisfaction rate'
      ],
      technologies: ['Cloud Platforms', 'Video Streaming', 'Mobile Development', 'AI/ML', 'Analytics', 'CMS'],
      stats: [
        { value: '75%', label: 'Engagement Boost', icon: TrendingUp },
        { value: '50%', label: 'Time Saved', icon: Zap },
        { value: '95%', label: 'Satisfaction', icon: Star },
        { value: '60%', label: 'Better Outcomes', icon: Award }
      ]
    },
    'logistics-transportation': {
      icon: Truck,
      name: 'Logistics & Transportation',
      tagline: 'Smart Logistics for Efficient Operations',
      description: 'Fleet management, route optimization, real-time tracking, and warehouse automation solutions.',
      fullDescription: 'Optimize your logistics operations with intelligent solutions for fleet management, route planning, and warehouse automation. Reduce costs, improve delivery times, and enhance customer satisfaction.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200',
      gradient: 'from-teal-600 to-cyan-600',
      accent: 'teal',
      solutions: [
        {
          title: 'Fleet Management',
          description: 'Complete fleet tracking and management solutions with real-time visibility.',
          features: ['GPS tracking', 'Vehicle diagnostics', 'Driver management', 'Fuel monitoring']
        },
        {
          title: 'Route Optimization',
          description: 'AI-powered route planning minimizing distance, time, and fuel consumption.',
          features: ['Dynamic routing', 'Traffic integration', 'Multi-stop optimization', 'Delivery scheduling']
        },
        {
          title: 'Warehouse Automation',
          description: 'Automated warehouse systems improving accuracy and efficiency.',
          features: ['Inventory robots', 'Pick and pack automation', 'WMS integration', 'Quality control']
        },
        {
          title: 'Real-time Tracking',
          description: 'End-to-end shipment visibility for customers and internal teams.',
          features: ['Live tracking', 'ETA predictions', 'Customer notifications', 'Proof of delivery']
        }
      ],
      benefits: [
        '30% fuel cost reduction',
        '50% faster delivery times',
        '99% on-time delivery rate',
        '40% improvement in fleet utilization',
        '60% reduction in warehouse errors',
        '35% increase in customer satisfaction'
      ],
      technologies: ['IoT', 'AI/ML', 'GPS/GIS', 'Cloud Computing', 'Mobile Apps', 'Robotics'],
      stats: [
        { value: '30%', label: 'Fuel Savings', icon: TrendingUp },
        { value: '50%', label: 'Faster Delivery', icon: Zap },
        { value: '99%', label: 'On-Time Rate', icon: CheckCircle },
        { value: '40%', label: 'Fleet Utilization', icon: Truck }
      ]
    },
    'media-broadcasting': {
      icon: Satellite,
      name: 'Media & Broadcasting',
      tagline: 'Next-Gen Content Delivery',
      description: 'Content delivery networks, streaming platforms, digital rights management, and audience analytics.',
      fullDescription: 'Power your media operations with cutting-edge solutions for content delivery, streaming, and audience engagement. Deliver exceptional viewing experiences while maximizing reach and revenue.',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200',
      gradient: 'from-violet-600 to-purple-600',
      accent: 'violet',
      solutions: [
        {
          title: 'CDN Optimization',
          description: 'Global content delivery networks ensuring fast, reliable streaming worldwide.',
          features: ['Edge caching', 'Load balancing', 'DDoS protection', 'Analytics dashboard']
        },
        {
          title: 'Streaming Platforms',
          description: 'Scalable OTT platforms supporting millions of concurrent viewers.',
          features: ['Adaptive bitrate', 'Multi-device support', 'Live streaming', 'VOD library']
        },
        {
          title: 'Content Protection',
          description: 'DRM and security solutions protecting your valuable content assets.',
          features: ['Multi-DRM support', 'Watermarking', 'Geo-blocking', 'Access control']
        },
        {
          title: 'Audience Analytics',
          description: 'Deep insights into viewer behavior and content performance.',
          features: ['Viewing patterns', 'Engagement metrics', 'Recommendation engine', 'Revenue analytics']
        }
      ],
      benefits: [
        '80% faster content delivery',
        '3x viewer engagement',
        'Global scale achieved',
        '50% reduction in buffering',
        '70% increase in viewer retention',
        '100% content protection'
      ],
      technologies: ['Cloud Infrastructure', 'CDN', 'Video Encoding', 'AI/ML', 'DRM', 'Analytics'],
      stats: [
        { value: '80%', label: 'Faster Delivery', icon: Zap },
        { value: '3x', label: 'Engagement', icon: TrendingUp },
        { value: '99.99%', label: 'Uptime', icon: Shield },
        { value: '70%', label: 'Retention', icon: Users }
      ]
    }
  };

  const industry = industriesData[slug];

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Industry Not Found</h1>
          <Link to="/industries">
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Back to Industries
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <Link to="/industries" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Industries</span>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Icon className="w-5 h-5 text-orange-400" />
              <span className="text-white font-semibold">Industry Solution</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6">
              {industry.name}
            </h1>
            <p className="text-2xl text-green-400 font-semibold mb-8">
              {industry.tagline}
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              {industry.fullDescription}
            </p>

            <Link to="/contact">
              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industry.stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex p-4 bg-white rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    <StatIcon className={`w-8 h-8 text-${industry.accent}-600`} />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Our Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions tailored for {industry.name.toLowerCase()}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industry.solutions.map((solution, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 p-8 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-green-600 group-hover:bg-clip-text transition-all">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  <div className="space-y-3">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 text-${industry.accent}-600 flex-shrink-0`} />
                        <span className="text-gray-700 font-medium">{feature}</span>
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
      <section className="py-24 bg-gradient-to-br from-orange-50 to-green-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Key Benefits
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable results that drive business growth and transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {industry.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 font-semibold">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      {/* Technologies Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                Technologies We Use
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology stack powering our solutions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {industry.technologies.map((tech, index) => (
              <div key={index} className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 cursor-default">
                <span className="text-white font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-orange-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Ready to Transform Your {industry.name}?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-white/95">
            Let's discuss how our solutions can drive growth and innovation in your organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <button className="px-10 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-3">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/case-studies">
              <button className="px-10 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                View Case Studies
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;
