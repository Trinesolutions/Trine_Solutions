import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Sparkles, Award, Shield, Zap, TrendingUp, Building2, Star, Globe, Rocket, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const footerSections = [
    {
      title: 'Solutions',
      icon: Zap,
      links: [
        { name: 'Digital Transformation', path: '/services', badge: 'Hot' },
        { name: 'Cloud Solutions', path: '/services', badge: 'New' },
        { name: 'AI & Machine Learning', path: '/services' },
        { name: 'Cybersecurity', path: '/services', badge: 'Trending' },
        { name: 'Data Analytics', path: '/services' },
        { name: 'IoT Solutions', path: '/services' },
      ],
    },
    {
      title: 'Industries',
      icon: Building2,
      links: [
        { name: 'Telecommunications', path: '/industries', badge: 'Featured' },
        { name: 'Healthcare', path: '/industries' },
        { name: 'Finance & Banking', path: '/industries' },
        { name: 'Retail & E-commerce', path: '/industries' },
        { name: 'Manufacturing', path: '/industries' },
        { name: 'Education', path: '/industries' },
      ],
    },
    {
      title: 'Company',
      icon: Award,
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/about#team' },
        { name: 'Careers', path: '/careers', badge: 'Hiring' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Contact', path: '/contact' },
        { name: 'Partnerships', path: '/partnerships' },
      ],
    },
    {
      title: 'Resources',
      icon: Sparkles,
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Whitepapers', path: '/resources' },
        { name: 'Webinars', path: '/resources' },
        { name: 'Documentation', path: '/docs' },
        { name: 'Support Center', path: '/support' },
        { name: 'API Reference', path: '/api' },
      ],
    },
  ];

  const socialLinks = [
    { 
      icon: Linkedin, 
      url: 'https://linkedin.com', 
      label: 'LinkedIn', 
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-600/20',
      followers: '25K+'
    },
    { 
      icon: Twitter, 
      url: 'https://twitter.com', 
      label: 'Twitter', 
      color: 'from-sky-500 to-blue-500',
      bgColor: 'bg-sky-500/20',
      followers: '18K+'
    },
    { 
      icon: Facebook, 
      url: 'https://facebook.com', 
      label: 'Facebook', 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/20',
      followers: '32K+'
    },
    { 
      icon: Instagram, 
      url: 'https://instagram.com', 
      label: 'Instagram', 
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/20',
      followers: '45K+'
    },
    { 
      icon: Youtube, 
      url: 'https://youtube.com', 
      label: 'YouTube', 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/20',
      followers: '15K+'
    },
  ];

  const achievements = [
    { number: '200+', label: 'Projects Delivered', icon: Rocket },
    { number: '99.9%', label: 'Uptime Record', icon: Shield },
    { number: '50+', label: 'Countries Served', icon: Globe },
    { number: '24/7', label: 'Support', icon: Zap },
  ];

  const currentStats = [
    { label: 'Active Projects', value: '47' },
    { label: 'Team Members', value: '156' },
    { label: 'Client Satisfaction', value: '98.7%' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900" data-testid="main-footer" role="contentinfo" aria-label="Site footer">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {/* Main Gradient Orbs */}
        <div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full filter blur-[120px] animate-float"
          style={{
            top: '-20%',
            left: '-10%',
            animationDuration: '25s',
          }}
        ></div>
        <div 
          className="absolute w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-[100px] animate-float"
          style={{
            bottom: '-15%',
            right: '-5%',
            animationDelay: '3s',
            animationDuration: '30s',
          }}
        ></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          ></div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}></div>
      </div>

      {/* Interactive Mouse Trail */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
        aria-hidden="true"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10">
        {/* Stats Banner */}
        <div 
          className={`grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-white/10 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div 
                key={index}
                className="text-center group cursor-pointer"
                style={{
                  transitionDelay: `${300 + index * 100}ms`,
                }}
              >
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-500">
                    <IconComponent className="w-8 h-8 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm text-gray-400 font-medium group-hover:text-cyan-300 transition-colors duration-300">
                  {achievement.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time Stats */}
        <div className="py-8 border-b border-white/10">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {currentStats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-2xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
            <div className="group">
              <div className="text-2xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
              <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                Live Status
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-16">
            {/* Brand Section */}
            <div 
              className={`lg:col-span-2 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="group flex items-center space-x-4 mb-8 cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center font-black text-2xl text-white shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <span className="relative z-10">T</span>
                  </div>
                </div>
                <div>
                  <span className="block text-3xl font-black bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent group-hover:tracking-wider transition-all duration-300">
                    Trine Solutions
                  </span>
                  <span className="block text-sm text-cyan-500 font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                    <Star className="w-3 h-3" />
                    Premium Digital Innovation Partner
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Transforming businesses through cutting-edge <span className="text-cyan-400 font-semibold">AI-driven solutions</span>, 
                cloud infrastructure, and digital innovation that drives measurable results.
              </p>
              
              <div className="space-y-4">
                <div className="group/item flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-500/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Global Headquarters</div>
                    <div className="text-gray-400 text-sm">123 Innovation Drive, Tech Valley, CA 94025</div>
                  </div>
                </div>
                
                <div className="group/item flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-500/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Contact Sales</div>
                    <a href="tel:+15551234567" className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="group/item flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-500/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email Us</div>
                    <a href="mailto:info@trinesolutions.com" className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                      info@trinesolutions.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <nav 
                  key={index} 
                  aria-labelledby={`footer-section-${index}`}
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-8 group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 id={`footer-section-${index}`} className="text-white text-lg font-bold group-hover:text-cyan-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-3" role="list">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.path}
                          data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="group/link relative text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:bg-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 -ml-2 group-hover/link:ml-0 transition-all duration-300 text-cyan-400" />
                            <span className="relative font-medium">
                              {link.name}
                            </span>
                          </div>
                          {link.badge && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold group-hover/link:scale-110 transition-transform duration-300">
                              {link.badge}
                            </span>
                          )}
                          <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>

          {/* Social & Newsletter */}
          <div className="grid lg:grid-cols-2 gap-12 py-12 border-t border-white/10">
            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Stay Updated
              </h3>
              <p className="text-gray-300 text-lg">
                Get the latest insights on digital transformation, AI trends, and industry innovations.
              </p>
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Subscribe
                  <Rocket className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Join Our Community
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
                    style={{
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className={`w-12 h-12 rounded-xl ${social.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{social.label}</div>
                      <div className="text-cyan-400 text-sm">{social.followers} followers</div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className={`border-t border-white/10 py-8 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Copyright */}
            <div className="flex items-center gap-4 text-gray-400">
              <p className="text-sm font-medium">
                © {new Date().getFullYear()} <span className="text-white font-bold">Trine Solutions</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-cyan-400">
                <Heart className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Made with passion</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link 
                to="/privacy" 
                className="group relative text-gray-400 hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-white/5" 
              >
                Privacy Policy
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                to="/terms" 
                className="group relative text-gray-400 hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-white/5" 
              >
                Terms of Service
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                to="/cookies" 
                className="group relative text-gray-400 hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-white/5" 
              >
                Cookie Policy
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;