import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Globe, Menu, X, Linkedin } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode, language, setLanguage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

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
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
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
            className="glass absolute right-4 top-20 w-[calc(100%-2rem)] max-w-sm rounded-3xl p-6"
            onClick={(e) => e.stopPropagation()}
            data-testid="mobile-menu"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col space-y-2" role="list">
              {navLinks.map((link) => (
                <li key={link.path}>
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