import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Zap, Shield, Cloud, BarChart3, FileCheck, Wrench, CheckCircle2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const iconMap = {
  Zap,
  Shield,
  Cloud,
  BarChart3,
  FileCheck,
  Wrench,
};

const Home = () => {
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, casesRes, blogRes] = await Promise.all([
          axios.get(`${API}/services`),
          axios.get(`${API}/case-studies`),
          axios.get(`${API}/blog`),
        ]);
        setServices(servicesRes.data);
        setCaseStudies(casesRes.data.slice(0, 3));
        setBlogPosts(blogRes.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const industries = [
    { name: 'Banking', image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400' },
    { name: 'Healthcare', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400' },
    { name: 'Manufacturing', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400' },
    { name: 'Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400' },
    { name: 'Education', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400' },
    { name: 'Logistics', image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400' },
  ];

  const partners = [
    'AWS', 'Microsoft', 'Google Cloud', 'IBM', 'Oracle', 'Salesforce', 'SAP', 'Cisco'
  ];

  return (
    <main id="main-content" className="min-h-screen" data-testid="home-page" role="main">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-labelledby="hero-title">
        <div className="absolute inset-0 gradient-orange-blue opacity-90" aria-hidden="true"></div>
        
        {/* Animated Particles */}
        <div className="particles" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container relative z-10 text-center text-white">
          <div className="animate-fade-in-up">
            <h1 id="hero-title" className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Driving Digital Excellence<br />with Intelligent Solutions
            </h1>
            <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto opacity-95" data-testid="hero-subtitle">
              Enterprise-grade consulting, cybersecurity, and digital transformation services that power the future of business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/services" data-testid="explore-services-btn">
                <button className="btn-primary bg-white text-orange-600 hover:bg-gray-100" aria-label="Explore our services">
                  Explore Services
                </button>
              </Link>
              <Link to="/contact" data-testid="get-consultation-btn">
                <button className="btn-ghost border-white text-white hover:bg-white hover:text-deep-blue" aria-label="Get a free consultation">
                  Get Consultation
                </button>
              </Link>
            </div>
          </div>

          {/* MacBook Mockup */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200"
              alt="Digital dashboard showcasing enterprise analytics and insights"
              className="rounded-3xl shadow-2xl mx-auto max-w-4xl w-full"
              data-testid="hero-image"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Trust & Partners */}
      <section className="py-12 bg-white dark:bg-gray-900" aria-labelledby="partners-title">
        <div className="container">
          <h2 id="partners-title" className="text-center text-gray-600 dark:text-gray-400 mb-8 font-medium text-sm tracking-wider">TRUSTED BY LEADING ENTERPRISES</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400 hover:text-orange-500 transition-colors duration-300">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className="gradient-subtle py-20" aria-labelledby="about-title">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <img
                src="https://images.pexels.com/photos/4066295/pexels-photo-4066295.jpeg?w=800"
                alt="Office Space"
                className="rounded-3xl shadow-2xl"
                data-testid="about-image"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="about-title">Who We Are</h2>
              <p className="text-lg mb-6 opacity-90">
                Trine Solutions is a global leader in enterprise technology consulting, delivering innovative solutions that transform businesses and drive measurable results.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  <span className="text-lg font-medium">10+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  <span className="text-lg font-medium">Global Delivery Team</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  <span className="text-lg font-medium">Enterprise Architecture Specialists</span>
                </div>
              </div>
              <Link to="/about" data-testid="learn-more-about-btn">
                <button className="btn-primary flex items-center space-x-2">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="services-title">Our Services</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Comprehensive solutions designed to accelerate your digital transformation journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Zap;
              return (
                <div
                  key={service.id}
                  className="glass-card p-8 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`service-card-${index}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-orange-blue flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="opacity-80 mb-6">{service.description}</p>
                  <Link to="/services" data-testid={`service-learn-more-${index}`}>
                    <button className="text-orange-500 font-semibold flex items-center space-x-2 hover:space-x-3 transition-all duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="gradient-subtle py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="industries-title">Industries We Serve</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Delivering specialized solutions across diverse sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center group cursor-pointer"
                data-testid={`industry-card-${index}`}
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4">
                  <img
                    src={industry.image}
                    alt={`${industry.name} industry solutions`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20" aria-labelledby="case-studies-title">
        <div className="container">
          <div className="text-center mb-16">
            <h2 id="case-studies-title" className="text-4xl lg:text-5xl font-bold mb-4" data-testid="case-studies-title">Success Stories</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Real results from real partnerships.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <article
                key={study.id}
                className="glass-card overflow-hidden group"
                data-testid={`case-study-card-${index}`}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={`Case study: ${study.title}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-orange-500 font-semibold">{study.industry}</span>
                  <h3 className="text-xl font-bold mt-2 mb-4">{study.title}</h3>
                  <p className="text-sm opacity-80 mb-4">{study.results}</p>
                  <Link to="/case-studies" data-testid={`case-study-view-${index}`}>
                    <button className="text-orange-500 font-semibold flex items-center space-x-2" aria-label={`View ${study.title} case study`}>
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Insights/Blog */}
      <section className="gradient-subtle py-20" aria-labelledby="insights-title">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="insights-title">Latest Insights</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Thought leadership and industry perspectives.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className="glass-card overflow-hidden group"
                data-testid={`blog-post-card-${index}`}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-orange-500 font-semibold uppercase">{post.category}</span>
                  <h3 className="text-lg font-bold mt-2 mb-3">{post.title}</h3>
                  <p className="text-sm opacity-70 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs opacity-60">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/insights" data-testid="view-all-insights-btn">
              <button className="btn-primary">
                View All Insights
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-orange-blue opacity-90"></div>
        <div className="container relative z-10 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="cta-title">
            Let's Build the Future Together
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto opacity-95">
            Partner with us to transform your business and achieve exceptional results.
          </p>
          <Link to="/contact" data-testid="cta-contact-btn">
            <button className="btn-primary bg-white text-orange-600 hover:bg-gray-100" aria-label="Contact us today to discuss your project">
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;