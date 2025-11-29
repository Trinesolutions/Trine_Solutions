import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Globe, Menu, X, Linkedin, ChevronDown, Users, Briefcase, Calendar, FileText, Settings } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode, language, setLanguage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [consultingDropdownOpen, setConsultingDropdownOpen] = useState(false);
  const [mobileConsultingOpen, setMobileConsultingOpen] = useState(false);
  const location = useLocation();

  const consultingServices = [
    { name: 'Contingent Staffing', path: '/consulting/contingent-staffing', icon: Users },
    { name: 'Permanent Hiring', path: '/consulting/permanent-hiring', icon: Briefcase },
    { name: 'Contract to Hire', path: '/consulting/contract-to-hire', icon: Calendar },
    { name: 'Statement of Work', path: '/consulting/statement-of-work', icon: FileText },
    { name: 'Managed Services', path: '/consulting/managed-services', icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setConsultingDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Check if current path is a consulting service path
  const isConsultingActive = location.pathname.startsWith('/consulting');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Consulting Services', path: '/consulting', hasDropdown: true },
    { name: 'Industries', path: '/industries' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header role="banner">
        <nav
          data-testid="main-navbar"
          aria-label="Main navigation"
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
            scrolled ? 'w-[95%] lg:w-[90%]' : 'w-[98%] lg:w-[95%]'
          }`}
        >
          <div className="glass rounded-[30px] px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link 
                to="/" 
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-trine-orange focus:ring-offset-2 rounded-xl" 
                data-testid="logo-link"
                aria-label="Trine Solutions - Home"
              >
                <img 
                  src="/trine_logo.png" 
                  alt="Trine Solutions Logo" 
                  className="h-14 w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1" aria-label="Primary">
                {navLinks.map((link) => (
                  link.hasDropdown ? (
                    <div 
                      key={link.path}
                      className="relative"
                      onMouseEnter={() => setConsultingDropdownOpen(true)}
                      onMouseLeave={() => setConsultingDropdownOpen(false)}
                    >
                      <button
                        data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-trine-orange flex items-center ${
                          isConsultingActive
                            ? 'bg-gradient-to-r from-trine-orange to-trine-lightblue text-white'
                            : 'hover:bg-trine-orange/10 hover:text-trine-orange'
                        }`}
                        aria-expanded={consultingDropdownOpen}
                        aria-haspopup="true"
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${consultingDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {consultingDropdownOpen && (
                        <div 
                          className="absolute top-full left-0 mt-2 w-64 glass rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <div className="py-2">
                            {consultingServices.map((service) => {
                              const ServiceIcon = service.icon;
                              return (
                                <Link
                                  key={service.path}
                                  to={service.path}
                                  className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                    location.pathname === service.path
                                      ? 'bg-trine-orange/10 text-trine-orange'
                                      : 'hover:bg-trine-orange/10 hover:text-trine-orange'
                                  }`}
                                  role="menuitem"
                                  onClick={() => setConsultingDropdownOpen(false)}
                                >
                                  <ServiceIcon className="w-5 h-5 mr-3" aria-hidden="true" />
                                  {service.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-trine-orange ${
                        location.pathname === link.path
                          ? 'bg-gradient-to-r from-trine-orange to-trine-lightblue text-white'
                          : 'hover:bg-trine-orange/10 hover:text-trine-orange'
                      }`}
                      aria-current={location.pathname === link.path ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-3" role="group" aria-label="Site controls">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/trine-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="linkedin-link"
                  className="p-2 rounded-full hover:bg-trine-orange/10 hover:text-trine-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-trine-orange"
                  aria-label="Visit our LinkedIn page"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>

                {/* Search */}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  data-testid="search-button"
                  className="p-2 rounded-full hover:bg-trine-orange/10 hover:text-trine-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-trine-orange"
                  aria-label="Open search"
                  aria-expanded={searchOpen}
                  aria-haspopup="dialog"
                >
                  <Search className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  data-testid="theme-toggle"
                  className="p-2 rounded-full hover:bg-trine-orange/10 hover:text-trine-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-trine-orange"
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  aria-pressed={darkMode}
                >
                  {darkMode ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
                </button>

                {/* Language Selector */}
                <div className="relative hidden sm:block">
                  <label htmlFor="language-selector" className="sr-only">Select language</label>
                  <span id="language-description" className="sr-only">Choose your preferred language for the website</span>
                  <select
                    id="language-selector"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    data-testid="language-selector"
                    aria-describedby="language-description"
                    className="appearance-none bg-transparent pl-8 pr-3 py-2 rounded-full text-sm font-medium cursor-pointer outline-none hover:bg-trine-orange/10 transition-all duration-300 focus:ring-2 focus:ring-trine-orange"
                  >
                    <option value="EN">EN</option>
                    <option value="ES">ES</option>
                    <option value="FR">FR</option>
                    <option value="DE">DE</option>
                  </select>
                  <Globe className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  data-testid="mobile-menu-toggle"
                  className="lg:hidden p-2 rounded-full hover:bg-trine-orange/10 hover:text-trine-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-trine-orange"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[60] flex items-start justify-center pt-32" 
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div 
            className="glass rounded-3xl p-6 w-[90%] max-w-2xl" 
            onClick={(e) => e.stopPropagation()} 
            data-testid="search-overlay"
            role="search"
          >
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-400" aria-hidden="true" />
              <label htmlFor="search-input" className="sr-only">Search</label>
              <input
                id="search-input"
                type="search"
                placeholder="Search for services, insights, or solutions..."
                data-testid="search-input"
                className="flex-1 bg-transparent outline-none text-lg focus:ring-0"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[55] lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav
            id="mobile-menu"
            className="glass absolute right-4 top-20 w-[calc(100%-2rem)] max-w-sm rounded-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            data-testid="mobile-menu"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col space-y-2" role="list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileConsultingOpen(!mobileConsultingOpen)}
                        data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-trine-orange ${
                          isConsultingActive
                            ? 'bg-gradient-to-r from-trine-orange to-trine-lightblue text-white'
                            : 'hover:bg-trine-orange/10 hover:text-trine-orange'
                        }`}
                        aria-expanded={mobileConsultingOpen}
                      >
                        {link.name}
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileConsultingOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {mobileConsultingOpen && (
                        <ul className="mt-2 ml-4 space-y-1 border-l-2 border-trine-orange/20 pl-4">
                          {consultingServices.map((service) => {
                            const ServiceIcon = service.icon;
                            return (
                              <li key={service.path}>
                                <Link
                                  to={service.path}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileConsultingOpen(false);
                                  }}
                                  className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    location.pathname === service.path
                                      ? 'bg-trine-orange/10 text-trine-orange'
                                      : 'hover:bg-trine-orange/10 hover:text-trine-orange'
                                  }`}
                                >
                                  <ServiceIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                  {service.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-trine-orange ${
                        location.pathname === link.path
                          ? 'bg-gradient-to-r from-trine-orange to-trine-lightblue text-white'
                          : 'hover:bg-trine-orange/10 hover:text-trine-orange'
                      }`}
                      aria-current={location.pathname === link.path ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;