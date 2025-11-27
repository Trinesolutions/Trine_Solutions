import { Building2, Heart, ShoppingBag, Factory, GraduationCap, Truck, Wifi, Satellite, Cloud, Server, Cpu, Shield, ArrowRight, CheckCircle, TrendingUp, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Industries = () => {
  const industries = [
    {
      icon: Building2,
      name: 'Banking & Finance',
      slug: 'banking-finance',
      description: 'Digital banking solutions, risk management, regulatory compliance, and fraud detection systems.',
      image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800',
      solutions: ['Core Banking Modernization', 'Payment Processing', 'Wealth Management', 'Compliance Automation'],
      impact: ['40% faster transaction processing', '60% reduction in compliance costs', '99.9% uptime achieved'],
      gradient: 'from-blue-600 to-purple-600',
      accent: 'bg-blue-500'
    },
    {
      icon: Heart,
      name: 'Healthcare',
      slug: 'healthcare',
      description: 'Patient care optimization, electronic health records, telemedicine platforms, and medical IoT solutions.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
      solutions: ['EHR Integration', 'Telemedicine Platforms', 'Medical Imaging AI', 'Patient Data Security'],
      impact: ['50% improvement in patient outcomes', 'HIPAA compliance achieved', '30% operational cost reduction'],
      gradient: 'from-green-600 to-emerald-600',
      accent: 'bg-green-500'
    },
    {
      icon: Wifi,
      name: 'Telecommunications',
      slug: 'telecommunications',
      description: '5G network optimization, IoT connectivity, cloud communications, and next-generation infrastructure solutions.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
      solutions: ['5G Network Deployment', 'IoT Connectivity', 'Cloud Communications', 'Network Security'],
      impact: ['60% faster network speeds', '99.99% network reliability', '40% operational efficiency gain'],
      gradient: 'from-cyan-600 to-blue-600',
      accent: 'bg-cyan-500'
    },
    {
      icon: Factory,
      name: 'Manufacturing',
      slug: 'manufacturing',
      description: 'Smart factory solutions, predictive maintenance, supply chain optimization, and quality control systems.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      solutions: ['Industrial IoT', 'Predictive Maintenance', 'Supply Chain Visibility', 'Quality Automation'],
      impact: ['35% increase in production efficiency', '45% reduction in downtime', '$5M annual savings'],
      gradient: 'from-orange-600 to-red-600',
      accent: 'bg-orange-500'
    },
    {
      icon: ShoppingBag,
      name: 'Retail & E-Commerce',
      slug: 'retail-ecommerce',
      description: 'Omnichannel commerce, inventory management, customer analytics, and personalized shopping experiences.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      solutions: ['E-commerce Platforms', 'Inventory Optimization', 'Customer Analytics', 'Personalization AI'],
      impact: ['55% increase in online sales', '40% improvement in customer retention', '25% cart abandonment reduction'],
      gradient: 'from-pink-600 to-rose-600',
      accent: 'bg-pink-500'
    },
    {
      icon: GraduationCap,
      name: 'Education',
      slug: 'education',
      description: 'Learning management systems, virtual classrooms, student analytics, and educational content platforms.',
      image: 'https://img.freepik.com/free-vector/modern-hand-drawn-education-concept_23-2147906438.jpg?semt=ais_hybrid&w=740&q=80',
      solutions: ['LMS Implementation', 'Virtual Learning', 'Student Performance Analytics', 'Administrative Automation'],
      impact: ['75% increase in student engagement', '50% administrative time saved', 'Global reach expansion'],
      gradient: 'from-indigo-600 to-purple-600',
      accent: 'bg-indigo-500'
    },
    {
      icon: Truck,
      name: 'Logistics & Transportation',
      slug: 'logistics-transportation',
      description: 'Fleet management, route optimization, real-time tracking, and warehouse automation solutions.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800',
      solutions: ['Fleet Management', 'Route Optimization', 'Warehouse Automation', 'Real-time Tracking'],
      impact: ['30% fuel cost reduction', '50% faster delivery times', '99% on-time delivery rate'],
      gradient: 'from-teal-600 to-cyan-600',
      accent: 'bg-teal-500'
    },
    {
      icon: Satellite,
      name: 'Media & Broadcasting',
      slug: 'media-broadcasting',
      description: 'Content delivery networks, streaming platforms, digital rights management, and audience analytics.',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800',
      solutions: ['CDN Optimization', 'Streaming Platforms', 'Content Protection', 'Audience Analytics'],
      impact: ['80% faster content delivery', '3x viewer engagement', 'Global scale achieved'],
      gradient: 'from-violet-600 to-purple-600',
      accent: 'bg-violet-500'
    }
  ];

  const telecomFeatures = [
    {
      icon: Cloud,
      title: '5G & Network Modernization',
      description: 'Next-generation network infrastructure and optimization',
      stats: '60% faster deployment'
    },
    {
      icon: Server,
      title: 'Edge Computing',
      description: 'Distributed computing for low-latency applications',
      stats: '10ms latency achieved'
    },
    {
      icon: Wifi,
      title: 'IoT Connectivity',
      description: 'Massive-scale device connectivity solutions',
      stats: '1M+ devices managed'
    },
    {
      icon: Shield,
      title: 'Network Security',
      description: 'End-to-end security and threat protection',
      stats: '99.99% uptime'
    },
    {
      icon: Cpu,
      title: 'AI-Powered Operations',
      description: 'Intelligent network management and automation',
      stats: '40% cost reduction'
    },
    {
      icon: Satellite,
      title: 'Global Infrastructure',
      description: 'Worldwide connectivity and cloud integration',
      stats: '200+ countries'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50" data-testid="industries-page">
      {/* Enhanced Hero with Modern Design */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-400/20 via-transparent to-black/30"></div>
        </div>
        
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">

          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight" data-testid="industries-hero-title">
            <span className="block text-white drop-shadow-2xl animate-fade-in-up">Industry-Specific</span>
            <span className="block bg-gradient-to-r from-green-300 via-green-200 to-green-100 bg-clip-text text-transparent animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
              Digital Solutions
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl max-w-5xl mx-auto mb-12 text-white/95 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Transforming businesses across sectors with cutting-edge technology and deep domain expertise
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/contact">
              <button className="group px-10 py-5 bg-white text-orange-600 rounded-2xl font-bold text-lg hover:bg-green-50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 flex items-center gap-3">
                <span>Explore Solutions</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
            <Link to="/case-studies">
              <button className="px-10 py-5 border-2 border-white/40 text-white rounded-2xl font-bold text-lg backdrop-blur-md hover:bg-white/20 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                View Success Stories
              </button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '8+', label: 'Industries' },
              { value: '200+', label: 'Projects' },
              { value: '99%', label: 'Success Rate' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-lg">{stat.value}</div>
                <div className="text-sm lg:text-base text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center items-start p-2">
            <div className="w-2 h-3 bg-white/80 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Telecom Spotlight Section */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-orange-50/30">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-green-200/30 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-green-100 border border-orange-200/50 mb-6 shadow-lg">
              <Wifi className="w-5 h-5 text-orange-600 animate-pulse" />
              <span className="text-sm font-bold text-gray-800 tracking-wide">Featured Industry</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Telecommunications
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Powering the next generation of connectivity with cutting-edge solutions for 5G, IoT, and global communications infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {telecomFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white backdrop-blur-sm border border-gray-200/50 p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-green-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-green-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="text-2xl font-black text-orange-600">
                    {feature.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Telecom Impact Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '5G Networks', label: 'Deployed' },
              { value: '99.99%', label: 'Network Uptime' },
              { value: '1M+', label: 'IoT Devices' },
              { value: '40%', label: 'Cost Reduction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-28 relative bg-gradient-to-b from-white via-green-50/30 to-white">
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-green-600 to-orange-600 bg-clip-text text-transparent">
                All Industries
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital transformation solutions tailored to your industry's unique challenges and opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Link
                key={index}
                to={`/industries/${industry.slug}`}
                className="block"
              >
                <div
                  className="group relative overflow-hidden rounded-3xl bg-white backdrop-blur-sm border border-gray-200/50 hover:shadow-2xl hover:shadow-orange-500/20 transform hover:scale-105 transition-all duration-500 cursor-pointer"
                  data-testid={`industry-card-${index}`}
                >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Header */}
                <div className="p-6 border-b border-gray-200/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <industry.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-green-600 group-hover:bg-clip-text transition-all duration-300">
                      {industry.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>

                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Solutions */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Solutions</h4>
                  <div className="space-y-2">
                    {industry.solutions.slice(0, 3).map((solution, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full ${industry.accent}`}></div>
                        {solution}
                      </div>
                    ))}
                    {industry.solutions.length > 3 && (
                      <div className="text-xs text-orange-600 font-medium mt-2">
                        +{industry.solutions.length - 3} more solutions
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-orange-400/50 transition-all duration-500"></div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        <div className="container relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-8 shadow-xl">
            <CheckCircle className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold tracking-wide">Industry-Proven Solutions</span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="block text-white drop-shadow-2xl">Ready to Transform</span>
            <span className="block bg-gradient-to-r from-green-300 via-green-200 to-green-100 bg-clip-text text-transparent drop-shadow-lg">
              Your Industry?
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto mb-12 text-white/95 leading-relaxed font-light">
            Let's discuss how our industry-specific expertise can drive your digital transformation journey 
            and create lasting competitive advantage.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/contact">
              <button className="group px-12 py-5 bg-white text-orange-600 rounded-2xl font-bold text-lg hover:bg-green-50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 flex items-center gap-3">
                <span>Start Your Project</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-12 py-5 border-2 border-white/40 text-white rounded-2xl font-bold text-lg backdrop-blur-md hover:bg-white/20 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                Get In Touch
              </button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            {[
              { value: '8+', label: 'Industries', icon: Building2 },
              { value: '200+', label: 'Projects', icon: CheckCircle },
              { value: '99%', label: 'Success Rate', icon: TrendingUp },
              { value: '24/7', label: 'Support', icon: Zap }
            ].map((stat, index) => (
              <div key={index} className="group transform hover:scale-110 transition-transform duration-300">
                <div className="inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-white/30 transition-colors duration-300 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-lg">{stat.value}</div>
                <div className="text-sm lg:text-base text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;