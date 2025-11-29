import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Linkedin,
} from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isConsultingActive = location.pathname.startsWith('/consulting');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Consulting Services', path: '/consulting' },
    { name: 'Industries', path: '/industries' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
        <nav
          className={`transition-all duration-500 ${
            scrolled ? 'w-[95%] lg:w-[90%]' : 'w-[98%] lg:w-[95%]'
          }`}
        >
          {/* NEW PREMIUM NAV CONTAINER */}
          <div
            className={`
              rounded-[30px] px-6 py-4 transition-all duration-500 backdrop-blur-xl border
              ${
                darkMode
                  ? 'bg-black/50 border-white/10 shadow-xl shadow-black/40'
                  : 'bg-white/90 border-gray-200 shadow-lg shadow-gray-300/40'
              }
            `}
          >
            <div className="flex items-center justify-between">

              {/* LOGO */}
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/trine_logo.png"
                  alt="Trine Solutions Logo"
                  className="h-14 w-auto"
                />
              </Link>

              {/* DESKTOP NAVIGATION */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${
                        location.pathname === link.path ||
                        (link.path === '/consulting' && isConsultingActive)
                          ? 'bg-gradient-to-r from-trine-orange to-trine-lightblue text-white shadow-md'
                          : darkMode
                          ? 'hover:bg-white/10 hover:text-trine-orange text-gray-200'
                          : 'hover:bg-trine-orange/10 hover:text-trine-orange text-gray-700'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* RIGHT ACTION BUTTONS */}
              <div className="flex items-center space-x-3">

                {/* LINKEDIN */}
                <a
                  href="https://www.linkedin.com/company/trine-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-2 rounded-full transition-all duration-300
                    ${
                      darkMode
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                {/* SEARCH */}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`
                    p-2 rounded-full transition-all duration-300
                    ${
                      darkMode
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* DARK MODE TOGGLE */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`
                    p-2 rounded-full transition-all duration-300
                    ${
                      darkMode
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* MOBILE MENU TOGGLE */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`
                    lg:hidden p-2 rounded-full transition-all duration-300
                    ${
                      darkMode
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-start justify-center pt-32"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className={`rounded-3xl p-6 w-[90%] max-w-2xl ${
              darkMode
                ? 'bg-black/50 border border-white/10'
                : 'bg-white shadow-xl border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="search"
                placeholder="Search for services or solutions..."
                className="flex-1 bg-transparent outline-none text-lg"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav
            className={`
              absolute right-4 top-24 w-[calc(100%-2rem)] max-w-sm rounded-3xl p-6 max-h-[80vh] overflow-y-auto
              ${
                darkMode
                  ? 'bg-black/50 border border-white/10 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300
                      ${
                        location.pathname === link.path ||
                        (link.path === '/consulting' && isConsultingActive)
                          ? 'bg-gradient-to-r from-trine-orange to-trine-lightblue text-white'
                          : darkMode
                          ? 'hover:bg-white/10'
                          : 'hover:bg-gray-100'
                      }
                    `}
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
