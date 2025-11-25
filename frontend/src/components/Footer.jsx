import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Sparkles, Send, Award, Shield, Zap, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const footerSections = [
    {
      title: 'Company',
      icon: Award,
      links: [
        { name: 'About', path: '/about' },
        { name: 'Leadership', path: '/about' },
        { name: 'Vision & Mission', path: '/about' },
        { name: 'Sustainability', path: '/about' },
      ],
    },
    {
      title: 'Services',
      icon: Zap,
      links: [
        { name: 'Digital Transformation', path: '/services' },
        { name: 'Cybersecurity', path: '/services' },
        { name: 'Cloud & DevOps', path: '/services' },
        { name: 'Data & Analytics', path: '/services' },
        { name: 'Risk & Compliance', path: '/services' },
        { name: 'IT Advisory', path: '/services' },
      ],
    },
    {
      title: 'Industries',
      icon: TrendingUp,
      links: [
        { name: 'Finance', path: '/industries' },
        { name: 'Healthcare', path: '/industries' },
        { name: 'Retail', path: '/industries' },
        { name: 'Manufacturing', path: '/industries' },
        { name: 'Education', path: '/industries' },
        { name: 'Logistics', path: '/industries' },
      ],
    },
    {
      title: 'Resources',
      icon: Sparkles,
      links: [
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Insights', path: '/insights' },
        { name: 'Whitepapers', path: '/insights' },
        { name: 'Podcast', path: '/insights' },
        { name: 'News & Updates', path: '/insights' },
      ],
    },
    {
      title: 'Support',
      icon: Shield,
      links: [
        { name: 'Contact Support', path: '/contact' },
        { name: 'FAQs', path: '/contact' },
        { name: 'Helpdesk', path: '/contact' },
        { name: 'Client Portal', path: '/contact' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook', color: 'from-blue-600 to-blue-400' },
    { icon: Twitter, url: '#', label: 'Twitter', color: 'from-sky-500 to-blue-400' },
    { icon: Linkedin, url: '#', label: 'LinkedIn', color: 'from-blue-700 to-blue-500' },
    { icon: Instagram, url: '#', label: 'Instagram', color: 'from-purple-600 via-pink-600 to-orange-500' },
    { icon: Youtube, url: '#', label: 'YouTube', color: 'from-red-600 to-red-500' },
  ];

  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Industry Awards' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <footer className="relative overflow-hidden" data-testid="main-footer" role="contentinfo" aria-label="Site footer">
      {/* Animated Gradient Background with Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 animate-gradient-xy" aria-hidden="true"></div>
      
      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-30" aria-hidden="true">
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-orange-500 to-pink-500 rounded-full filter blur-[120px] animate-float"
          style={{
            top: '10%',
            left: '10%',
            animationDelay: '0s',
            animationDuration: '20s',
          }}
        ></div>
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full filter blur-[100px] animate-float"
          style={{
            bottom: '10%',
            right: '10%',
            animationDelay: '2s',
            animationDuration: '25s',
          }}
        ></div>
        <div 
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full filter blur-[90px] animate-float"
          style={{
            top: '50%',
            right: '30%',
            animationDelay: '4s',
            animationDuration: '30s',
          }}
        ></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Parallax Mouse Effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
        aria-hidden="true"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="container relative z-10 py-20">
        <br/>
        <br/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Company Info */}
          <div 
            className={`lg:col-span-2 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="group flex items-center space-x-3 mb-6 cursor-pointer">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-blue-500 flex items-center justify-center font-black text-3xl text-white shadow-2xl group-hover:shadow-orange-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 to-blue-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                <span className="relative z-10">T</span>
              </div>
              <div>
                <span className="block text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent group-hover:tracking-wider transition-all duration-300">
                  Trine Solutions
                </span>
                <span className="block text-xs text-orange-400 font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Excellence in Innovation
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 leading-relaxed text-base backdrop-blur-sm">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="font-semibold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                  Driving digital excellence
                </span>
              </span>
              {' '}with intelligent solutions. Your trusted partner in enterprise transformation and innovation.
            </p>
            
            <address className="space-y-4 text-gray-300 not-italic">
              <div className="group/item flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-orange-400 group-hover/item:text-orange-300" aria-hidden="true" />
                </div>
                <span className="flex-1 group-hover/item:text-white transition-colors pt-1.5">
                  123 Innovation Drive, Tech Park, Silicon Valley, CA 94025
                </span>
              </div>
              
              <div className="group/item flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-blue-400 group-hover/item:text-blue-300 group-hover/item:rotate-12 transition-all duration-300" aria-hidden="true" />
                </div>
                <a href="tel:+15551234567" className="flex-1 group-hover/item:text-white transition-colors pt-1.5">
                  +1 (555) 123-4567
                </a>
              </div>
              
              <div className="group/item flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-purple-400 group-hover/item:text-purple-300" aria-hidden="true" />
                </div>
                <a href="mailto:info@trinesolutions.com" className="flex-1 group-hover/item:text-white transition-colors pt-1.5">
                  info@trinesolutions.com
                </a>
              </div>
            </address>
          </div>

          {/* Footer Links */}
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
                  transitionDelay: `${400 + index * 100}ms`,
                }}
              >
                <div className="flex items-center gap-2 mb-6 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-4 h-4 text-orange-400" />
                  </div>
                  <h3 id={`footer-section-${index}`} className="text-white text-lg font-black group-hover:text-orange-400 transition-colors duration-300">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2" role="list">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="group/link relative text-gray-300 hover:text-white transition-all duration-300 flex items-center py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white/5"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 -ml-2 group-hover/link:ml-0 mr-0 group-hover/link:mr-2 transition-all duration-300 text-orange-400" aria-hidden="true" />
                        <span className="relative">
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 group-hover/link:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        {/* Newsletter Section */}
        <div 
          className={`relative overflow-hidden rounded-3xl mb-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 animate-gradient-x"></div>
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5"></div>
          <div className="absolute inset-0 border border-white/20 rounded-3xl"></div>
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className={`border-t border-white/10 pt-10 transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Copyright */}
            <p className="text-gray-400 text-sm font-medium">
              © {new Date().getFullYear()} <span className="text-white font-bold">Trine Solutions</span>. All rights reserved. Crafted with{' '}
              <span className="inline-block animate-pulse text-red-500">❤️</span>
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3" data-testid="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-${social.label.toLowerCase()}`}
                  className="group relative w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-500 hover:scale-125 hover:-translate-y-2 overflow-hidden"
                  aria-label={social.label}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <social.icon className="relative z-10 w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link 
                to="#" 
                className="group relative text-gray-400 hover:text-white transition-colors duration-300" 
                data-testid="privacy-policy-link"
              >
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                to="#" 
                className="group relative text-gray-400 hover:text-white transition-colors duration-300" 
                data-testid="terms-link"
              >
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                to="#" 
                className="group relative text-gray-400 hover:text-white transition-colors duration-300"
              >
                Cookie Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;