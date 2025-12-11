import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Digital Transformation', path: '/services/digital-transformation' },
        { name: 'Cloud Solutions', path: '/services/cloud-solutions' },
        { name: 'AI & ML', path: '/services/ai-ml' },
        { name: 'Cybersecurity', path: '/services/cybersecurity' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { name: 'Telecommunications', path: '/industries/telecommunications' },
        { name: 'Healthcare', path: '/industries/healthcare' },
        { name: 'Finance', path: '/industries/banking-finance' },
        { name: 'Retail', path: '/industries/retail-ecommerce' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, url: 'https://www.linkedin.com/company/trinesolutions', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-black text-white mb-0 pb-0" data-testid="main-footer">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link to="/" className="inline-block">
                  <img 
                    src="/trine_logo.png" 
                    alt="Trine Solutions Logo" 
                    className="h-16 w-auto mb-3"
                  />
                </Link>
                <p className="text-sm text-orange-400 font-medium">Digital Innovation Partner</p>
              </div>
              
              <p className="text-gray-400 mb-8 leading-relaxed">
                Transforming businesses through cutting-edge technology solutions, 
                cloud infrastructure, and digital innovation.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-400 hover:text-orange-400 transition-colors group">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0 group-hover:text-orange-400" />
                  <div>
                    <p className="font-medium text-white">Global Headquarters</p>
                    <p className="text-sm">14042 NE 8th Street, #201C, Bellevue, WA 98007</p>
                  </div>
                </div>
                
                <a href="tel:+14252025165" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group">
                  <Phone className="w-5 h-5 flex-shrink-0 group-hover:text-orange-400" />
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-sm">+1 (425) 202-5165</p>
                  </div>
                </a>
                
                <a href="mailto:trine@trinesolutions.com" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group">
                  <Mail className="w-5 h-5 flex-shrink-0 group-hover:text-orange-400" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-sm">trine@trinesolutions.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-white text-lg font-bold mb-6 relative inline-block">
                  {section.title}
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500"></span>
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="group flex items-center text-gray-400 hover:text-orange-400 transition-all duration-300"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-orange-400" />
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-orange-500 hover:to-blue-500 border border-gray-700 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} <span className="text-white font-semibold">Trine Solutions</span>. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
